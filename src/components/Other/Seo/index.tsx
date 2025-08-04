import { SeoInterface } from "@/interfaces/SeoInterface";
import Head from "next/head";

const Seo = ({ title, description }: SeoInterface) => {
  return (
    <Head>
      <meta name="author" content="Adam Neves" />
      <meta name="keywords" content="Javascript" />
      <link rel="fluid-icon" href="/ts.png" title="Adam Neves" />
      <link rel="icon" type="image/png" href="/ts.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <link rel="shortcut icon" href="/ts.png" type="image/png" />
      <link rel="icon" href="/ts.png" sizes="32x32" />
      <link rel="icon" href="/ts.png" sizes="48x48" />
      <link rel="icon" href="/ts.png" sizes="96x96" />
      <link rel="icon" href="/ts.png" sizes="144x144" />
      <link rel="icon" href="/ts.png" sizes="512x512" />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Adam Neves" />
      <meta property="og:type" content="website" key="ogtype" />
      <meta property="og:url" content="https://vagnermengali.com/" />
      <meta property="og:image:alt" content={description} />
      <meta property="og:image" content="/portfolio-blue.png" />
      <meta name="twitter:title" content="Adam Neves" />
      <meta name="twitter:site" content="@adamsnows" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="/portfolio-blue.png" />
      <meta name="twitter:description" content={description} />
      <meta property="al:ios:app_name" content="Adam Neves" />
      <meta property="al:ios:url" content="https://vagnermengali.com/" />
      <meta property="al:android:app_name" content="Adam Neves" />
      <meta property="al:android:url" content="https://vagnermengali.com/" />
      <link rel="canonical" href="https://adamsnows.vercel.app/" />
      <meta name="theme-color" content="#7A90FF" />
      <meta name="msapplication-TileColor" content="#7A90FF" />
      <meta name="msapplication-navbutton-color" content="#7A90FF" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#7A90FF" />
      <link rel="manifest" href={"/manifest.webmanifest"} />
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index, follow" />
    </Head>
  );
};

export default Seo;
