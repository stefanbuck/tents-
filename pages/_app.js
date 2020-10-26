import { Provider } from 'next-auth/client'
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  const { session } = pageProps
  return (
    <Provider session={session}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
