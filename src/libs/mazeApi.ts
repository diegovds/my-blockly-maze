import { FullMaze } from "@/types/FullMaze";
import { Maze } from "@/types/Maze";

import { UpdatedMaze } from "@/types/UpdatedMaze";
import { compactDateFormatting, fullDateFormatting } from "./dayjs";
import prisma from "./prisma";

export const mazeApi = () => {
  const getAllMazes = async (page: number) => {
    let treatedData: Maze[] = [];

    /** Qtde de mazes retornados */
    let take = 24;

    /** Qtde de mazes a ser saltados */
    let skip = 0;

    /** skip e take para fazer a paginação */

    if (page) {
      skip = (page - 1) * take;
    }

    const mazes = await prisma.maze
      .findMany({
        skip,
        take,

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
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    for (let index = 0; index < mazes.length; index++) {
      const element = mazes[index];

      treatedData.push({
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

    return treatedData;
  };

  const insertNewMaze = async (
    userId: string,
    name: string,
    executions: number,
    code: string,
    image: string,
    urlImage: string,
    thumbnail: string,
    urlThumbnail: string,
    levels: string
  ) => {
    return await prisma.maze
      .create({
        data: {
          userId,
          name,
          executions,
          code,
          image,
          urlImage,
          thumbnail,
          urlThumbnail,
          levels,
        },
        select: {
          id: true,
          name: true,
          executions: true,
          code: true,
          image: true,
          urlImage: true,
          thumbnail: true,
          urlThumbnail: true,
          levels: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  };

  const deleteMaze = async (id: string) => {
    return await prisma.maze
      .delete({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          executions: true,
          code: true,
          image: true,
          urlImage: true,
          thumbnail: true,
          urlThumbnail: true,
          levels: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  };

  const getMaze = async (id: string, showUserId?: boolean) => {
    const maze = await prisma.maze
      .findUniqueOrThrow({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          code: true,
          levels: true,
          image: true,
          urlImage: true,
          thumbnail: true,
          urlThumbnail: true,
          executions: true,
          createdAt: true,
          userId: showUserId === true ? true : false,
          user: { select: { name: true } },
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    let treatedData: FullMaze = {
      id: maze.id,
      name: maze.name,
      code: maze.code,
      levels: JSON.parse(JSON.stringify(maze.levels)),
      image: maze.image,
      urlImage: maze.urlImage,
      thumbnail: maze.thumbnail,
      urlThumbnail: maze.urlThumbnail,
      executions: maze.executions,
      createdAt: fullDateFormatting(maze.createdAt),
      username: maze.user.name,
      userId: showUserId === true ? maze.userId : null,
    };

    if (maze) {
      return treatedData;
    }
  };

  const updateMaze = async (id: string, data: UpdatedMaze) => {
    return await prisma.maze
      .update({
        where: {
          id,
        },
        data: {
          name: data.name,
          image: data.image,
          urlImage: data.urlImage,
          createdAt: data.createdAt,
          code: data.code,
          executions: data.executions,
          levels: JSON.stringify(data.levels),
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  };

  return {
    getAllMazes,
    insertNewMaze,
    deleteMaze,
    getMaze,
    updateMaze,
  };
};
