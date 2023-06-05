import * as C from "./styles";

import { FullMaze } from "@/types/FullMaze";
import copy from "copy-to-clipboard";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import CountUp from "react-countup";
import { FaRegCopy } from "react-icons/fa";
import Balance from "react-wrap-balancer";
import Skeleton from "../Skeleton";

type Props = {
  maze: FullMaze;
  notify: (status: string) => void;
  loadGame: () => void;
  loading: boolean;
};

const MazePage = ({
  maze: {
    name,
    code,
    username,
    createdAt,
    executions,
    levels,
    thumbnail,
    urlThumbnail,
  },
  loading,
  notify,
  loadGame,
}: Props) => {
  const { status: sessionStatus } = useSession();
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [styleImg, setStyleImg] = useState("img_loading");

  const MazeAnimate = {
    hidden: { opacity: 1, scale: 0.75 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const VisibleItemVariant = {
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <C.Coontainer>
      <C.Maze
        variants={MazeAnimate}
        initial="hidden"
        animate={sessionStatus === "loading" ? undefined : "visible"}
      >
        <C.Img
          variants={{
            hidden: { x: -20, opacity: 0 },
            ...VisibleItemVariant,
          }}
        >
          {showSkeleton && <Skeleton skeletonWidth="87%" />}
          <Image
            src={urlThumbnail}
            alt={thumbnail}
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
        <C.Informations
          variants={{
            hidden: { x: 20, opacity: 0 },
            ...VisibleItemVariant,
          }}
        >
          <h2>
            <Balance>
              {name} (Cód. {code})
            </Balance>
          </h2>
          <p className="p_data">
            <Balance>
              Criado por <strong>{username}</strong> em{" "}
              <strong>{createdAt}</strong>
            </Balance>
          </p>
          <p className="p_data">
            Quantidade de níveis: <strong>{JSON.parse(levels).length}</strong>
          </p>
          <p className="p_data">
            Total de execuções:{" "}
            <strong>
              <CountUp end={executions} delay={0.8} />
            </strong>
          </p>
          <p className="p_a">
            <Balance>
              Ao clicar no botão abaixo a reprodução do Maze Game será iniciada.
            </Balance>
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
