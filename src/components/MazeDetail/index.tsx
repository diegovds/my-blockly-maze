import * as C from "./styles";

import { Maze } from "@/types/Maze";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {
  maze: Maze;
  dashboard?: boolean;
  deleteMazeGame?: (maze: Maze) => void;
};

const MazeDetail = ({
  maze: { urlImage, image, name, createdAt, id, code },
  dashboard,
  deleteMazeGame,
}: Props) => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [styleImg, setStyleImg] = useState("img_loading");

  return (
    <C.MazeDiv>
      {showSkeleton && <Skeleton width={`100%`} />}
      <Image
        src={urlImage}
        alt={image}
        width={100}
        height={100}
        priority
        className={styleImg}
        onLoad={() => {
          setShowSkeleton(false);
          setStyleImg("img_loaded");
        }}
      />
      <h3>{name}</h3>
      <p id="date">
        Criado em:
        <br />
        {createdAt}
      </p>
      <Link href={`/mazes/${id}`} className="btn">
        Detalhes
      </Link>
      {dashboard && deleteMazeGame && (
        <button
          className="btn btn-danger"
          onClick={() =>
            deleteMazeGame({ urlImage, image, name, createdAt, id, code })
          }
        >
          Excluir
        </button>
      )}
    </C.MazeDiv>
  );
};

export default MazeDetail;
