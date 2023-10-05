import Head from 'next/head';
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Lyrics Finder</title>
        <link rel="icon" href="/favicon.icon"></link>
        <link
					href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
					rel="stylesheet"
				/>
      </Head>
    <Component {...pageProps} />
    </>
  );
}