import Head from "next/head";

type Props = {
  title: string;
  description: string;
  image: string;
};

const Seo = ({ title, description, image }: Props) => {
  return (
    <Head>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://my-blockly-maze.vercel.app" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {/* End Twitter tags */}
    </Head>
  );
};

export default Seo;
