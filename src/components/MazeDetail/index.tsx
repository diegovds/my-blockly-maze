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
  loading?: boolean;
  disabled?: boolean;
};

const MazeDetail = ({
  maze: { urlImage, image, name, createdAt, id, code },
  dashboard,
  deleteMazeGame,
  loading,
  disabled,
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
      <Link
        href={`/mazes/${id}`}
        className="btn"
        style={loading || disabled ? { pointerEvents: "none" } : {}}
      >
        Detalhes
      </Link>
      {dashboard && deleteMazeGame && !loading && !disabled && (
        <button
          className="btn btn-danger"
          onClick={() =>
            deleteMazeGame({ urlImage, image, name, createdAt, id, code })
          }
        >
          Excluir
        </button>
      )}

      {dashboard && deleteMazeGame && loading && (
        <button className="btn" disabled>
          Aguarde...
        </button>
      )}

      {dashboard && deleteMazeGame && disabled && (
        <button className="btn" style={{ backgroundColor: "#f00" }} disabled>
          Excluir
        </button>
      )}
    </C.MazeDiv>
  );
};

export default MazeDetail;
