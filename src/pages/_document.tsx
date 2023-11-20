import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Best PWA app in the world!" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="mask-icon" href="/vercel.svg" color="#FFFFFF" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/vercerl.svg" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
