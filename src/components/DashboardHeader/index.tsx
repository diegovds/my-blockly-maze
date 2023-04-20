import Link from "next/link";
import * as C from "./styles";

type Props = {
  amount: number;
  username: string;
};

const DashboardHeader = ({ username, amount }: Props) => {
  return (
    <>
      <C.Container>
        <h2>Dashboard</h2>
        <p>Gerencie os seus jogos</p>
      </C.Container>
      <C.WelcomeBanner>
        <p>
          Olá, <strong>{username}</strong>
        </p>
        <p>
          Quantidade de jogos criados: <strong>{amount}</strong>
        </p>
        <p>
          Gostaria de criar um novo jogo?{" "}
          <Link href="/mazes/create">
            <strong>Clique aqui</strong>
          </Link>
        </p>
      </C.WelcomeBanner>
    </>
  );
};

export default DashboardHeader;
