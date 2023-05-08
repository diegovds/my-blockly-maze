import { NextSeo } from "next-seo";
import Head from "next/head";
import ReactGA from "react-ga4";

type Props = {
  title: string;
  description: string;
  image?: string;
  path: string;
};

const Seo = ({ title, description, image, path }: Props) => {
  const urlD = "https://myblocklymaze-v2.vercel.app";

  // Send pageview with a custom path
  ReactGA.send({
    hitType: "pageview",
    page: path,
    title: title,
  });

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
        canonical={urlD}
        openGraph={{
          url: `${urlD}${path}`,
          title: title,
          description: description,
          images: [
            {
              url: image ? image : `${urlD}/image.png`,
              width: 700,
              height: 600,
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
