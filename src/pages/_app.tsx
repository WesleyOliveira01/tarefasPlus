import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Cabecalho from './../components/cabecalho/index';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Cabecalho />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
