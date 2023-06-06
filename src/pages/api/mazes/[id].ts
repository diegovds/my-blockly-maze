import {
  removeFromFirebase,
  uploadToFirebase,
} from "@/hooks/useFirebaseStorage";
import { mazeApi as api } from "@/libs/mazeApi";
import multerConfig from "@/libs/multerConfig";
import { UpdatedMaze as UpdatedMazeType } from "@/types/UpdatedMaze";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import nextConnect from "next-connect";

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

/** Delete a maze */
apiRoute.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret });

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { id } = req.query;
  const { getMaze, deleteMaze } = api();

  const maze = await getMaze(id as string, true);

  if (maze?.userId !== token.sub) {
    res.status(401).json({ message: token });
    return;
  }

  const deletedMaze = await deleteMaze(id as string).catch((e) => {
    res.status(400).json({ e });
  });

  if (deletedMaze) {
    removeFromFirebase(deletedMaze.image);
    removeFromFirebase(deletedMaze.thumbnail);

    res.json({ message: "Maze deletado com sucesso", data: deletedMaze });
    return;
  }

  res.status(404).json({ message: "Maze não encontrado" });
});

/** Get a maze */
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { getMaze } = api();

  const maze = await getMaze(id as string);

  if (maze) {
    res.json({ data: maze });
    return;
  }
});

/** Update a maze */
apiRoute.patch(getFile, async (req: any, res: NextApiResponse) => {
  const header = req.headers["myblocklymaze-admin"];
  const teste = req.headers["Authorization"];
  const token = await getToken({ req, secret });
  const { name, levels, executions, code, createdAt } = req.body;
  const { id } = req.query;
  const { getMaze, updateMaze } = api();
  let oldBackground: string | undefined;

  let data: UpdatedMazeType = {};

  const maze = await getMaze(id as string, true);

  if (header !== process.env.MYBLOCKLYMAZE && token?.sub !== maze?.userId) {
    res.status(401).json({ message: teste });
    return;
  }

  if (!maze) {
    res.status(404).json({ message: "Maze não encontrado" });
    return;
  } else {
    if (req.file) {
      oldBackground = maze.image;

      const { image, urlImage } = await uploadToFirebase(req.file);

      if (urlImage.length === 0) {
        res.status(400).json({ error: "Erro ao fazer upload da imagem" });
        return;
      }

      data.image = image;
      data.urlImage = urlImage;
    }

    if (name) {
      data.name = name;
    }

    if (code) {
      data.code = code;
    }

    if (executions) {
      data.executions = parseInt(executions as string);
    }

    if (levels) {
      data.levels = levels;
    }

    if (createdAt) {
      data.createdAt = createdAt;
    }

    const updatedMaze = await updateMaze(id as string, data).catch((e) => {
      if (oldBackground && data.image) {
        removeFromFirebase(data.image);
      }

      res.status(400).json({ error: e.meta });
    });

    if (updatedMaze) {
      if (oldBackground) {
        removeFromFirebase(oldBackground);
      }

      res.json({ message: "Maze atualizado com sucesso" });
      return;
    }
  }
});
export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
