import { GetServerSideProps } from "next";

type Props = {
  q: string;
};

const SearchPage = ({ q }: Props) => {
  return <h2>Pesquisa por {q}</h2>;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { q } = query;

  if (!q) {
    return {
      notFound: true,
    };
  }

  /*if (session) {
    return {
      redirect: { destination: "/dashboard", permanent: true },
    };
  }*/

  return {
    props: {
      q,
    },
  };
};

export default SearchPage;
