import Seo from "@/components/Seo";
import * as C from "@/styles/ErrorPage.styles";
import Link from "next/link";

const Page500 = () => {
  return (
    <>
      <Seo
        title="My BLOCKLY Maze | Erro 500"
        description={`Página de erro 500 da plataforma My BLOCKLY Maze.`}
        path="/500"
      />
      <C.Container>
        <C.Content>
          <C.H2>500</C.H2>
          <C.P>Ops, ocorreu um erro no nosso servidor.</C.P>
          <C.P>Você pode tentar acessar mais tarde.</C.P>
          <Link href="/" className="btn">
            Voltar para a página inicial
          </Link>
        </C.Content>
      </C.Container>
    </>
  );
};

export default Page500;
