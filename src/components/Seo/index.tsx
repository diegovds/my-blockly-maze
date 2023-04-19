import { NextSeo } from "next-seo";

type Props = {
  title: string;
  description: string;
  image?: string;
  path: string;
};

const Seo = ({ title, description, image, path }: Props) => {
  return (
    <NextSeo
      title={title}
      description={description}
      canonical="https://my-blockly-maze.vercel.app"
      openGraph={{
        url: `https://my-blockly-maze.vercel.app${path}`,
        title: title,
        description: description,
        images: [
          {
            url: image ? image : "https://i.imgur.com/C2xpI35.png",
          },
        ],
        siteName: "My BLOCKLY Maze",
        type: "website",
      }}
      twitter={{
        cardType: "summary_large_image",
      }}
    />
  );
};

export default Seo;
