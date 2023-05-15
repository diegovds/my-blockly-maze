const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

type codeGeneratorProps = (length: number) => Promise<{ code: string }>;

export const codeGenerator: codeGeneratorProps = async (length) => {
  let code = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return { code };
};
