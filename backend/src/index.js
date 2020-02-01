import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server';
import createStore from './db';
import typeDefs from './schema';
import resolvers from './resolvers';
import OrderAPI from './datasources/order';
import UserAPI from './datasources/user';

const store = createStore();

const dataSources = () => ({
  storeAPI: new OrderAPI({ store }),
  userAPI: new UserAPI({ store }),
});

const context = async ({ req }) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the userId onto the req for future requests to access
    req.userId = userId;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
});

if (process.env.NODE_ENV !== 'test') {
  server
    .listen({ port: process.env.PORT || 4000 })
    .then(({ url }) => console.log(`🚀 app running at ${url}`));
}
