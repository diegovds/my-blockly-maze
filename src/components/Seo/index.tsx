import Head from "next/head";
import { NextSeo } from "next-seo";

type Props = {
  title: string;
  description: string;
  image?: string;
  path: string;
};

const Seo = ({ title, description, image, path }: Props) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/puzzle-icon.png" />
        <link rel="apple-touch-icon" href="/puzzle-icon.png" />
        <meta name="theme-color" content="#add8e6" />
      </Head>
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
    </>
  );
};

export default Seo;
