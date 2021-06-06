import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
        />
        <meta name='description' content='Description' />
        <meta name='keywords' content='Keywords' />
        <title>Next.js PWA Example</title>

        {/* Remove these */}
        <link href='vendor/jquery-ui-1.12.1.min.css' rel='stylesheet' />
        <link href='vendor/jquery-ui.theme.min.css' rel='stylesheet' />
        <link href='vendor/jquery-ui.structure.min.css' rel='stylesheet' />
        <script src='vendor/jquery-3.6.0.min.js' type='text/javascript'></script>
        <script src='vendor/jquery-ui-1.12.1.min.js' type='text/javascript'></script>

        <link rel='manifest' href='/manifest.json' />
        <link
          href='/images/favicon-16x16.png'
          rel='icon'
          type='image/png'
          sizes='16x16'
        />
        <link
          href='/images/favicon-32x32.png'
          rel='icon'
          type='image/png'
          sizes='32x32'
        />
        <link rel='apple-touch-icon' href='/apple-icon.png'></link>
        <meta name='theme-color' content='#317EFB' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
