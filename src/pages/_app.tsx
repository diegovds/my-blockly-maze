import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";

import Layout from "@/components/Layout";
import GlobalStyle from "@/styles/global";
import Analytics from "@/components/Analytics";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Analytics />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <GlobalStyle />
    </SessionProvider>
  );
}
