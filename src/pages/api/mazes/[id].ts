import { mazeApi as api } from "@/libs/mazeApi";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multerConfig from "@/utils/multerConfig";
import uploadToFirebase from "@/utils/uploadToFirebase";
import removeFromFirebase from "@/utils/removeFromFirebase";
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

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
