import Head from 'next/head'
import Script from 'next/script';
import 'antd/dist/antd.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        id="wasm-loader-script"
        src="/wasm_exec.js"
        strategy="beforeInteractive"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
