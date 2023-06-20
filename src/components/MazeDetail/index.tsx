import * as C from "./styles";

import { Maze } from "@/types/Maze";
import { useInView } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import Skeleton from "../Skeleton";

type Props = {
  maze: Maze;
  dashboard?: boolean;
  deleteMazeGame?: (maze: Maze) => void;
  loading?: boolean;
  disabled?: boolean;
};

const MazeDetail = ({
  maze: { urlImage, image, name, createdAt, id, code, thumbnail, urlThumbnail },
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
    <C.MazeDetailContainer>
      <C.MazeDetail
        ref={refFlipCardBack}
        $inView={isInView && sessionStatus !== "loading" ? true : false}
      >
        <C.ImgDiv>
          {showSkeleton && (
            <Skeleton skeletonWidth="90%" skeletonMarginBottom={true} />
          )}
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
        </C.ImgDiv>
        <C.InfoDiv>
          <h3>{name}</h3>
          <time>
            <IoCalendarOutline />
            {createdAt}
          </time>
          <Link
            href={`/mazes/${id}`}
            className="btn"
            style={loading || disabled ? { pointerEvents: "none" } : {}}
          >
            Detalhes
          </Link>
          {dashboard && deleteMazeGame && (
            <button
              disabled={disabled || loading}
              className="btn btn-danger"
              style={disabled ? { backgroundColor: "#f00" } : {}}
              onClick={() =>
                deleteMazeGame({
                  urlImage,
                  image,
                  thumbnail,
                  urlThumbnail,
                  name,
                  createdAt,
                  id,
                  code,
                })
              }
            >
              {loading ? "Aguarde..." : "Excluir"}
            </button>
          )}
        </C.InfoDiv>
      </C.MazeDetail>
    </C.MazeDetailContainer>
  );
};

export default MazeDetail;
