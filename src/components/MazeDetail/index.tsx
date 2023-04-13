import * as C from './styles'

import { Maze } from "@/types/Maze";
import Image from "next/image";
import Link from "next/link";

type Props = {
  maze: Maze;
};

const MazeDetail = ({
  maze: { url_image, image, name, created_at, id },
}: Props) => {
  return (
    <C.MazeDiv>
      <Image src={url_image} alt={image} width={100} height={100} priority />
      <h3>{name}</h3>
      <p id="date">
        Criado em:
        <br />
        {created_at}
      </p>
      <Link href={`/mazes/${id}`} className="btn">
        Detalhes
      </Link>
    </C.MazeDiv>
  );
};

export default MazeDetail;
