import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";

import Layout from "@/components/Layout";
import GlobalStyle from "@/styles/global";
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <GoogleAnalytics trackPageViews={{ ignoreHashChange: true }} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <GlobalStyle />
    </SessionProvider>
  );
}
