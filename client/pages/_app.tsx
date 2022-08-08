import Head from 'next/head'
import Script from 'next/script';
import 'antd/dist/antd.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (<Component {...pageProps} />);
}

export default MyApp;
