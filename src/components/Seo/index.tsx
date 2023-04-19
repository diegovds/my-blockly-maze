import { NextSeo } from "next-seo";

type Props = {
  title: string;
  description: string;
  image: string;
};

const Seo = ({ title, description, image }: Props) => {
  return (
    <NextSeo
      title={title}
      description={description}
      canonical="https://my-blockly-maze.vercel.app"
      openGraph={{
        url: "https://my-blockly-maze.vercel.app",
        title: title,
        description: description,
        images: [
          {
            url: image,
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
