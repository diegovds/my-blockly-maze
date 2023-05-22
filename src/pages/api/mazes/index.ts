import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";

import { mazeApi as api } from "../../../libs/mazeApi";
import {
  removeFromFirebase,
  uploadToFirebase,
} from "@/hooks/useFirebaseStorage";
import { codeGenerator } from "@/utils/codeGenerator";
import multerConfig from "@/libs/multerConfig";
import { getToken } from "next-auth/jwt";

const getFile = multerConfig.single("image");
const secret = process.env.NEXTAUTH_SECRET;

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

apiRoute.options(async (req, res: NextApiResponse) => {
  return res.status(200).json({});
});

/** Get all mazes */
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { getAllMazes } = api();

  const mazes = await getAllMazes();

  res.status(200).json({ data: mazes });
});

/** Insert new maze */
apiRoute.post(getFile, async (req: any, res: NextApiResponse) => {
  const token = await getToken({ req, secret });

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { name, levels } = req.body;
  const { insertNewMaze } = api();

  const { image, urlImage } = await uploadToFirebase(req.file);

  if (urlImage.length === 0) {
    res.status(400).json({ error: "Erro ao fazer upload da imagem" });
    return;
  }

  const { code } = codeGenerator(6);

  const newMaze = await insertNewMaze(
    token.sub as string,
    name,
    0,
    code,
    image,
    urlImage,
    levels
  ).catch((e) => {
    removeFromFirebase(image);
    res.status(400).json({ error: e });
  });

  if (newMaze) {
    res.status(201).json({ status: true, data: newMaze });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
