import Head from "next/head";
import { NextSeo } from "next-seo";
import Script from "next/script";

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
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
        `}
      </Script>
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
