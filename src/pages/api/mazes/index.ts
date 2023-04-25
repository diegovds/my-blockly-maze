import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";

import { mazeApi as api } from "../../../libs/mazeApi";

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

apiRoute.use(multer().any());

apiRoute.options(async (req, res: NextApiResponse) => {
  return res.status(200).json({});
});

/** Get all mazes */
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { getAllMazes } = api();

  const mazes = await getAllMazes();

  res.status(200).json({ data: mazes });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
