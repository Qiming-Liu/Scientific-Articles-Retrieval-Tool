import React, { useState } from 'react';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import Router from 'next/router';
import { ThemeProvider } from '@mui/material/styles';
import NextNProgress from 'nextjs-progressbar';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from '@components/Layout';
import Navbar from '@components/Navbar';
import Loading from '@components/Loading';
import createTheme from '../theme';
import '@styles/main.scss';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [isLoading, setIsLoading] = useState(false);
  Router.events.on('routeChangeStart', () => {
    setIsLoading(true);
  });
  Router.events.on('routeChangeComplete', () => {
    setIsLoading(false);
  });
  return (
    <ThemeProvider theme={createTheme()}>
      <NextNProgress />
      <Head>
        <title>Index | {process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline />
      <Layout>
        <>
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
        </>
        {isLoading ? <Loading /> : <Component {...pageProps} />}
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
