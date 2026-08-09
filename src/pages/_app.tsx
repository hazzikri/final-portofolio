import type { AppProps } from "next/app";
import { Toaster } from "sonner";

import Layout from "@/components/Other/Layout/Layout";
import "@/styles/globals.css";
import { I18nProvider } from "@/lib/i18n";

function App({ Component, pageProps }: AppProps) {
  return (
    <I18nProvider>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </I18nProvider>
  );
}

export default App;
