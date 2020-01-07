import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import Page from '../components/Page';
import withData from '../lib/withData';
import { CartStateProvider } from '../components/LocalState';

function MyApp({ Component, apollo, pageProps }) {
  return (
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  // this exposes the query to the user
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
