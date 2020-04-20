import App from 'next/app'
import React from 'react'
import { CartStateProvider } from '../components/LocalState';
import Layout from '../components/Layout';
import withApollo from '../lib/with-apollo'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <CartStateProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartStateProvider>
    )
  }
}

export default withApollo(MyApp)
