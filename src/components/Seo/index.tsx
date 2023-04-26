import { NextSeo } from "next-seo";
import Head from "next/head";

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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
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
