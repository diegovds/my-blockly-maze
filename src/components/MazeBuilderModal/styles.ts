import { motion } from "framer-motion";
import styled from "styled-components";

export const Overlay = styled(motion.div)`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 3;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  padding: 2rem;
  background-color: #fff;
  border-radius: 20px;
  width: 60%;
  box-shadow: rgb(204, 204, 204) 0px 0px 4px;
`;
