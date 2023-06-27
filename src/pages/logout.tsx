import Seo from "@/components/Seo";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    signOut({ callbackUrl: "/login" });
  }, []);

  return (
    <>
      <Seo
        title="My BLOCKLY Maze | Logout"
        description={`Página de logout da plataforma My BLOCKLY Maze.`}
        path="/logout"
      />
    </>
  );
};

export default Logout;
