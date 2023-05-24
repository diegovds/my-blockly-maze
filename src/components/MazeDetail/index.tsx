import * as C from "./styles";

import { Maze } from "@/types/Maze";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import Balance from "react-wrap-balancer";
import Skeleton from "../Skeleton";

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
  const { status: sessionStatus } = useSession();
  const refFlipCardBack = useRef<HTMLDivElement>(null);
  const isInView = useInView(refFlipCardBack, { once: true });
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [styleImg, setStyleImg] = useState("img_loading");

  return (
    <C.FlipCard>
      <C.FlipCardBack
        ref={refFlipCardBack}
        inView={isInView && sessionStatus !== "loading" ? true : false}
        whileHover={{ y: -7.5 }}
      >
        {showSkeleton && (
          <Skeleton skeletonWidth="90%" skeletonMarginBottom={true} />
        )}
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
        <h3>{name}</h3>
        <time>
          <Balance>Criado em {createdAt}</Balance>
        </time>
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
      </C.FlipCardBack>
    </C.FlipCard>
  );
};

export default MazeDetail;
