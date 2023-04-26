import * as C from "./styles";

import { FullMaze } from "@/types/FullMaze";
import Image from "next/image";
import copy from "copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CountUp from "react-countup";

type Props = {
  maze: FullMaze;
  notify: (status: string) => void;
  loadGame: () => void;
  loading: boolean;
};

const MazePage = ({
  maze: {
    name,
    urlImage,
    image,
    code,
    username,
    createdAt,
    executions,
    levels,
  },
  loading,
  notify,
  loadGame,
}: Props) => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [styleImg, setStyleImg] = useState("img_loading");

  return (
    <C.Coontainer>
      <C.Maze>
        <C.Img>
          {showSkeleton && <Skeleton width={`100%`} />}
          <Image
            src={urlImage}
            alt={image}
            width={700}
            height={600}
            priority
            className={styleImg}
            onLoad={() => {
              setShowSkeleton(false);
              setStyleImg("img_loaded");
            }}
          />
        </C.Img>
        <C.Informations>
          <h2>
            {name} (Cód. {code})
          </h2>
          <p className="p_data">
            Criado por <strong>{username}</strong> em{" "}
            <strong>{createdAt}</strong>
          </p>
          <p className="p_data">
            Quantidade de níveis: <strong>{JSON.parse(levels).length}</strong>
          </p>
          <p className="p_data">
            Total de execuções:{" "}
            <strong>
              <CountUp end={executions} delay={0.35} />
            </strong>
          </p>
          <p className="p_a">
            Ao clicar no botão abaixo a reprodução do Maze Game será iniciada.
          </p>
          {!loading && (
            <button
              onClick={() => {
                loadGame();
              }}
              className="btn"
            >
              Iniciar Maze Game
            </button>
          )}
          {loading && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}
          <button
            className="btn"
            id="copy"
            onClick={() => {
              copy(window.location.href);
              notify("copy");
            }}
          >
            Copiar link
            <FaRegCopy />
          </button>
        </C.Informations>
      </C.Maze>
    </C.Coontainer>
  );
};

export default MazePage;
