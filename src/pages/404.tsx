import Seo from "@/components/Seo";
import * as C from "@/styles/ErrorPage.styles";
import Link from "next/link";

const Page404 = () => {
  return (
    <>
      <Seo
        title="My BLOCKLY Maze | Erro 404"
        description={`Página de erro 404 da plataforma My BLOCKLY Maze.`}
        path="/404"
      />
      <C.Container>
        <C.Content>
          <C.H2>404</C.H2>
          <C.P>Ops, a página não foi encontrada.</C.P>
          <C.P>Você pode tentar encontar na nossa página inicial.</C.P>
          <Link href="/" className="btn">
            Voltar para a página inicial
          </Link>
        </C.Content>
      </C.Container>
    </>
  );
};

export default Page404;
