/* eslint-disable react/jsx-props-no-spreading */
import { Provider } from 'next-auth/client';
import '@/css/main.css';

function MyApp({ Component, pageProps }) {
  const { session } = pageProps;

  return (
    <Provider session={session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
