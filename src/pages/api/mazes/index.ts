import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import {
  removeFromFirebase,
  uploadToFirebase,
} from "@/hooks/useFirebaseStorage";
import multerConfig from "@/libs/multerConfig";
import { codeGenerator } from "@/utils/codeGenerator";
import { getToken } from "next-auth/jwt";
import { mazeApi as api } from "../../../libs/mazeApi";

const getFile = multerConfig.array("image", 2);
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

  const { image, urlImage } = await uploadToFirebase(req.files[0]);
  const { image: thumbnail, urlImage: urlThumbnail } = await uploadToFirebase(
    req.files[1]
  );

  if (urlImage.length === 0 && urlThumbnail.length === 0) {
    res.status(400).json({ error: "Erro ao fazer upload da imagem" });
    return;
  }

  if (urlImage.length === 0 && urlThumbnail.length !== 0) {
    removeFromFirebase(thumbnail);

    res.status(400).json({ error: "Erro ao fazer upload da imagem" });
    return;
  }

  if (urlImage.length !== 0 && urlThumbnail.length === 0) {
    removeFromFirebase(image);

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
    thumbnail,
    urlThumbnail,
    levels
  ).catch((e) => {
    removeFromFirebase(image);
    removeFromFirebase(thumbnail);
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
