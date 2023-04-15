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
        url_image: element.urlImage,
        created_at: dayjs(element.createdAt)
          .locale("pt-br")
          .format("DD/MM/YYYY"),
      });
    }

    return treatedData;
  };

  return {
    getAllMazes,
  };
};