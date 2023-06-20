import { uploadToFirebase } from "@/hooks/useFirebaseStorage";
import multerConfig from "@/libs/multerConfig";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import nextConnect from "next-connect";

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
  },
});

const uploadMiddleware = multerConfig.single("image");

apiRoute.use(uploadMiddleware);

apiRoute.options(async (req, res: NextApiResponse) => {
  return res.status(200).json({});
});

/** Upload new image */
apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  // @ts-expect-error
  const file = req.file as Express.Multer.File;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (!file) {
    res.status(404).json({ message: "File not found" });
    return;
  }

  const { image, urlImage } = await uploadToFirebase(file);

  if (urlImage.length === 0) {
    res.status(404).json({ error: "Erro ao fazer upload da imagem" });
    return;
  }

  res.status(200).json({ image, urlImage });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
