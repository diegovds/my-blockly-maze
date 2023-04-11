import prisma from "./prisma";

export const api = () => {
  const getAllUsers = async (page: number) => {
    /** Qtde de users retornados */
    let take = 2;

    /** Qtde de users a ser saltados */
    let skip = 0;

    /** skip e take para fazer a paginação */

    if (page) {
      skip = (page - 1) * take;
    }

    const users = await prisma.user.findMany({
      skip,
      take,

      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  };

  const insertNewUser = async (
    name: string,
    email: string,
    password: string
  ) => {
    return await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  };

  const updateUser = async (id: string, name?: string) => {
    /** para não atulizar as colunas não desejadas */
    let data: {
      name?: string;
    } = {};

    if (name) {
      data.name = name;
    }

    return await prisma.user.update({
      where: {
        id,
      },
      data,
    });
  };

  const getUser = async (id: string) => {
    return await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  };

  const getUserFromEmail = async (email: string) => {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    });
  };

  const deleteUser = async (id: string) => {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  };

  return {
    getAllUsers,
    insertNewUser,
    updateUser,
    getUser,
    getUserFromEmail,
    deleteUser,
  };
};
