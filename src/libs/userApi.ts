import { Maze } from "@/types/Maze";
import prisma from "./prisma";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { MazesUser } from "@/types/MazesUser";

export const userApi = () => {
  const getAllUsers = async () => {
    const users = await prisma.user.findMany({
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
    const hash = await bcrypt.hash(password, 10);

    return await prisma.user.create({
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
      select: { id: true, name: true, email: true },
    });
  };

  const getUser = async (id: string) => {
    let treatedMaze: Maze[] = [];

    const dataUser = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        mazes: {
          select: {
            id: true,
            name: true,
            code: true,
            image: true,
            urlImage: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
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
          createdAt: dayjs(element.createdAt)
            .locale("pt-br")
            .format("DD/MM/YYYY"),
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
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        return user;
      }
    }

    return null;
  };

  const deleteUser = async (id: string) => {
    return await prisma.user.delete({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
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
