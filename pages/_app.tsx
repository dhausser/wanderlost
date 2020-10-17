import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'
import { CartStateProvider } from '../components/LocalState'
import Layout from '../components/Layout'

function App({ Component, pageProps }: AppProps): JSX.Element {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <CartStateProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartStateProvider>
    </ApolloProvider>
  )
}

export default App
