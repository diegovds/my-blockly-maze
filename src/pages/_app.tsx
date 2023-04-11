import type { AppProps } from "next/app";

import { ThemeProvider } from "styled-components";

import GlobalStyle from "@/styles/global";
import theme from "@/styles/theme";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <GlobalStyle />
    </ThemeProvider>
  );
}
