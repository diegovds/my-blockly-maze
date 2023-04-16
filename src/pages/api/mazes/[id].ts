import { mazeApi as api } from "@/libs/mazeApi";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multerConfig from "@/utils/multerConfig";
import uploadToFirebase from "@/utils/uploadToFirebase";
import removeFromFirebase from "@/utils/removeFromFirebase";
import { UpdatedMaze as UpdatedMazeType } from "@/types/UpdatedMaze";
const Generator = require("license-key-generator");

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

apiRoute.use(multerConfig.single("image"), uploadToFirebase);

apiRoute.options(async (req, res: NextApiResponse) => {
  return res.status(200).json({});
});

/** Inserting new Maze Game */
apiRoute.post(async (req: any, res: NextApiResponse) => {
  const { id } = req.query;
  const { name, levels } = req.body;
  const { insertNewMaze } = api();

  const options = {
    type: "random", // default "random"
    length: 6, // default 16
    group: 1, // default 4
    split: "-", // default "-"
    splitStatus: false, // default true
  };
  const codeGen = new Generator(options);
  codeGen.get(async (error: any, code: any) => {
    if (error) return console.error(error);
    //console.log("code=", code);

    const newMaze = await insertNewMaze(
      id as string,
      name,
      0,
      code,
      req.file.key,
      req.file.location,
      levels
    ).catch((e) => {
      removeFromFirebase(req.file.key);
      res.status(400).json({ error: e });
    });

    if (newMaze) {
      res.status(201).json({ status: true, data: newMaze });
    }
  });
});

/** Deleting maze info */
apiRoute.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { deleteMaze } = api();

  const deletedMaze = await deleteMaze(id as string).catch((e) => {
    res.status(400).json({ e });
  });

  if (deletedMaze) {
    removeFromFirebase(deletedMaze.image);

    res.json({ message: "Maze deletado com sucesso", data: deletedMaze });
    return;
  }

  res.status(404).json({ message: "Maze não encontrado" });
});

/** Getting a maze game */
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { getMaze } = api();

  const maze = await getMaze(id as string);

  if (maze) {
    res.json({ data: maze });
    return;
  }
});

/** Updating a Maze Game */
apiRoute.put(async (req: any, res: NextApiResponse) => {
  const { name, levels, executions, code, createdAt } = req.body;
  const { id } = req.query;
  const { getMaze, updateMaze } = api();
  let oldBackground: string | undefined;

  let data: UpdatedMazeType = {};

  const maze = await getMaze(id as string);

  if (!maze) {
    if (req.file) {
      removeFromFirebase(req.file.key);
    }
    res.status(404).json({ message: "Maze não encontrado" });
  } else {
    if (req.file) {
      oldBackground = maze.image;
      data.image = req.file.key;
      data.urlImage = req.file.location;
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
      if (oldBackground) {
        removeFromFirebase(req.file.key);
      }

      res.json({ error: e.meta });
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
