import withApollo from 'next-with-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { endpoint } from '../config';
import { LOCAL_STATE_QUERY } from '../components/Cart';

function createClient({ headers }) {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
      request: (operation) => {
        operation.setContext({
          fetchOptions: {
            credentials: 'include',
          },
          headers,
        });
      },
    }),
    resolvers: {
      Mutation: {
        toggleCart(_, variables, { cache }) {
          // read the cartOpen value from the cache
          const { cartOpen } = cache.readQuery({
            query: LOCAL_STATE_QUERY,
          });
          // Write the cart state to the opposite
          const data = {
            data: { cartOpen: !cartOpen },
          };
          cache.writeData(data);
          return data;
        },
      },
    },
  });
}

export default withApollo(createClient);
