import type { AppProps } from "next/app";
import { Toaster } from "sonner";

import Layout from "@/components/Other/Layout/Layout";
import "@/styles/globals.css";

import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  )
}

export default appWithTranslation(App);
