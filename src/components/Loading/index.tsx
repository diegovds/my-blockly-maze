import * as C from "./styles";

const Loading = () => {
  return (
    <C.Container>
      <C.Loader>
        <C.Ball></C.Ball>
        <C.Ball></C.Ball>
        <C.Ball></C.Ball>
        <C.Label>Carregando...</C.Label>
      </C.Loader>
    </C.Container>
  );
};

export default Loading;
