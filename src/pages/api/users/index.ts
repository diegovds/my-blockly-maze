import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { api } from "@/libs/api";

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

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { page } = req.query;
  const { getAllUsers } = api();

  const users = await getAllUsers(parseInt(page as string));

  res.status(200).json({ data: users });
});

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password } = req.body;
  const { insertNewUser } = api();

  const newUser = await insertNewUser(name, email, password).catch((e) => {
    e.meta
      ? res.status(501).json({ error: e.meta })
      : res.status(501).json({ error: e });
  });

  if (newUser) {
    res.status(201).json({ status: true, user: newUser });
  }
});

export default apiRoute;
