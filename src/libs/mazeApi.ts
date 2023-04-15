import { FullMaze } from "@/types/FullMaze";
import { Maze } from "@/types/Maze";

import prisma from "./prisma";
import dayjs from "dayjs";

export const mazeApi = () => {
  const getAllMazes = async () => {
    let treatedData: Maze[] = [];

    const mazes = await prisma.maze.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        urlImage: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    for (let index = 0; index < mazes.length; index++) {
      const element = mazes[index];

      treatedData.push({
        id: element.id,
        name:
          element.name.length > 8
            ? element.name.slice(0, 8) + "..."
            : element.name,
        image: element.image,
        urlImage: element.urlImage,
        createdAt: dayjs(element.createdAt)
          .locale("pt-br")
          .format("DD/MM/YYYY"),
      });
    }

    return treatedData;
  };

  const insertNewMaze = async (
    userId: string,
    name: string,
    executions: number,
    code: string,
    image: string,
    urlImage: string,
    levels: string
  ) => {
    return await prisma.maze.create({
      data: {
        userId,
        name,
        executions,
        code,
        image,
        urlImage,
        levels,
      },
      select: {
        id: true,
        name: true,
        executions: true,
        code: true,
        image: true,
        urlImage: true,
        levels: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  };

  const deleteMaze = async (id: string) => {
    return await prisma.maze.delete({
      where: {
        id: parseInt(id as string),
      },
      select: {
        id: true,
        name: true,
        executions: true,
        code: true,
        image: true,
        urlImage: true,
        levels: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  };

  const getMaze = async (id: string) => {
    const maze = await prisma.maze.findUniqueOrThrow({
      where: {
        id: parseInt(id as string),
      },
      select: {
        id: true,
        name: true,
        code: true,
        levels: true,
        image: true,
        urlImage: true,
        executions: true,
        createdAt: true,
        user: { select: { name: true } },
      },
    });

    let treatedData: FullMaze = {
      id: maze.id,
      name: maze.name,
      code: maze.code,
      levels: JSON.parse(JSON.stringify(maze.levels)),
      image: maze.image,
      urlImage: maze.urlImage,
      executions: maze.executions,
      createdAt: dayjs(maze.createdAt).locale("pt-br").format("DD/MM/YYYY"),
      username: maze.user.name,
    };

    if (maze) {
      return treatedData;
    }
  };

  return {
    getAllMazes,
    insertNewMaze,
    deleteMaze,
    getMaze,
  };
};
