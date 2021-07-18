/* eslint-disable react/jsx-props-no-spreading */
import '@/css/main.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
