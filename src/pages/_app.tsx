import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "@/styles/global";
import theme from "@/styles/theme";
import Layout from "@/components/Layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <GlobalStyle />
      </ThemeProvider>
    </SessionProvider>
  );
}
