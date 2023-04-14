import { useRouter } from "next/router";

const MazePage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <h2>Página do jogo {id}</h2>;
};

export default MazePage;
