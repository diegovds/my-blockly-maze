import { api } from "@/libs/api";
import { NextApiRequest, NextApiResponse } from "next";
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

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { getUser } = api();

  const user = await getUser(id as string);

  res.status(200).json(user);
});

apiRoute.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name } = req.body;
  const { updateUser } = api();

  const updatedUser = await updateUser(id as string, name).catch(
    (e) => {
      res.status(501).json({ error: e.meta });
    }
  );

  if (updatedUser) {
    res.json({ user: updatedUser });
    return;
  }
});

apiRoute.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { deleteUser } = api();

  const user = await deleteUser(id as string).catch((e) => {
    res.status(501).json({ error: e.meta });
  });

  res.json({ message: "Usuário deletado", user });
});

export default apiRoute;