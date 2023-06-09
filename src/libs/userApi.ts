import { Maze } from "@/types/Maze";
import { MazesUser } from "@/types/MazesUser";
import bcrypt from "bcrypt";
import { compactDateFormatting } from "./dayjs";
import prisma from "./prisma";

export const userApi = () => {
  const getAllUsers = async () => {
    const users = await prisma.user
      .findMany({
        select: {
          id: true,
          name: true,
          email: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    return users;
  };

  const insertNewUser = async (
    name: string,
    email: string,
    password: string
  ) => {
    const hash = await bcrypt.hash(password, 10);

    return await prisma.user
      .create({
        data: {
          name,
          email,
          password: hash,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
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

    return await prisma.user
      .update({
        where: {
          id,
        },
        data,
        select: { id: true, name: true, email: true },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  };

  const getUser = async (id: string, page?: number) => {
    let treatedMaze: Maze[] = [];

    /** Qtde de mazes retornados */
    const take = 18;

    /** Qtde de mazes a ser saltados */
    let skip = 0;

    /** skip e take para fazer a paginação */

    if (page) {
      skip = (page - 1) * take;
    }

    const dataUser = await prisma.user
      .findUniqueOrThrow({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          mazes: {
            skip: page ? skip : undefined,
            take: page ? take : undefined,

            select: {
              id: true,
              name: true,
              code: true,
              image: true,
              urlImage: true,
              thumbnail: true,
              urlThumbnail: true,
              createdAt: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    if (dataUser.mazes.length !== undefined) {
      for (let index = 0; index < dataUser.mazes.length; index++) {
        const element = dataUser.mazes[index];

        treatedMaze.push({
          id: element.id,
          name: element.name,
          code: element.code,
          image: element.image,
          urlImage: element.urlImage,
          thumbnail: element.thumbnail,
          urlThumbnail: element.urlThumbnail,
          createdAt: compactDateFormatting(element.createdAt),
        });
      }
    }

    let treatedUser: MazesUser = {
      id: dataUser.id,
      username: dataUser.name,
      mazes: treatedMaze,
    };

    return treatedUser;
  };

  const getUserWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    const user = await prisma.user
      .findUniqueOrThrow({
        where: {
          email,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        return user;
      }
    }

    return null;
  };

  const deleteUser = async (id: string) => {
    return await prisma.user
      .delete({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  };

  return {
    getAllUsers,
    insertNewUser,
    updateUser,
    getUser,
    getUserWithEmailAndPassword,
    deleteUser,
  };
};
