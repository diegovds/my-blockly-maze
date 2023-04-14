import * as C from "./styles";

import { FullMaze } from "@/types/FullMaze";
import Image from "next/image";
import copy from "copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa";

type Props = {
  maze: FullMaze;
  notify: (status: string) => void;
};

const MazePage = ({
  maze: {
    name,
    url_image,
    image,
    code,
    username,
    created_at,
    executions,
    levels,
  },
  notify,
}: Props) => {
  const clipboard = () => {
    copy(window.location.href);
  };

  return (
    <C.Coontainer>
      <C.Maze>
        <C.Img>
          <Image
            src={url_image}
            alt={image}
            width={700}
            height={600}
            priority
          />
        </C.Img>
        <C.Informations>
          <h2>
            {name} (Cód. {code})
          </h2>
          <p className="p_data">
            Criado por {username} em {created_at}
          </p>
          <p className="p_data">
            Quantidade de níveis: {JSON.parse(levels).length}
          </p>
          <p className="p_data">Total de execuções: {executions}</p>
          <p className="p_a">
            Ao clicar no botão abaixo a reprodução do Maze Game será iniciada.
          </p>
          <button className="btn">Iniciar Maze Game</button>
          <button
            className="btn"
            id="copy"
            onClick={() => {
              clipboard();
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
