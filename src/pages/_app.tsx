import type { AppProps } from "next/app";

import ReactGA from "react-ga4";

import { SessionProvider } from "next-auth/react";

import Layout from "@/components/Layout";
import GlobalStyle from "@/styles/global";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  ReactGA.initialize(`${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`);

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <GlobalStyle />
    </SessionProvider>
  );
}
