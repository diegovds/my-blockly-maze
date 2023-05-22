import { Maze } from "./Maze";

export type FullMaze = Maze & {
  code: string;
  username: string;
  levels: string;
  executions: number;
  userId: string | null;
};
