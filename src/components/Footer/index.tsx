import * as C from "./styles";

import { IoMdHeart } from "react-icons/io";

const Footer = () => {
  return (
    <C.Footer>
      <C.Span>
        Feito com
        <IoMdHeart size={13} className="text-red-600" />
        por
        <C.Strong>Diego Viana</C.Strong>
      </C.Span>
    </C.Footer>
  );
};

export default Footer;
