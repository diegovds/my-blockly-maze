import { useCallback, useEffect, useRef, useState } from "react";
import * as C from "./styles";
import Loading from "../Loading";

type Props = {
  link: string;
  redirect: (mazeId?: string) => void;
};

const Iframe = ({ link, redirect }: Props) => {
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleMessage = useCallback(
    (e: MessageEvent) => {
      // para ter acesso ao dado temos que acessar a propriedade data
      //if (e.data === "mensagem vinda do iframe") {
      if (String(e.data).includes("mensagem")) {
        //console.log(e.data);
        if (String(e.data).includes("mazeId=")) {
          //console.log("tem mazeId");
          let mazeId = String(e.data).slice(17);
          //console.log(mazeId); /** id do novo maze criado */
          redirect(mazeId);
        } else {
          redirect();
        }
      }
    },
    [redirect]
  );

  useEffect(() => {
    // window escutando o evento `message` que o postMessage envia
    window.addEventListener("message", handleMessage);
    // 👇️ remove o event listener quando o componente é desmontado
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [handleMessage]);

  return (
    <>
      <C.Container>
        <C.Iframe
          src={link}
          title="iframeLink"
          frameBorder="0"
          allowFullScreen={true}
          ref={iframeRef}
          onLoad={() => {
            iframeRef.current?.scrollIntoView();
            setLoading(false);
          }}
        />
      </C.Container>
      {loading && <Loading />}
    </>
  );
};

export default Iframe;
