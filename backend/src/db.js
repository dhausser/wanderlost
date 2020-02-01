import { MongoClient } from 'mongodb';
import OrderDAO from './datasources/order';
import UserDAO from './datasources/user';

const port = process.env.PORT || 8000;

export default async () => {
  const client = await MongoClient.connect(process.env.DATABASE, {
    poolSize: 50,
    wtimeout: 2500,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((err) => {
    console.error(err.stack);
    process.exit(1);
  }).then(async (client) => {
    await OrderDAO.injectDB(client);
    await UserDAO.injectDB(client);
  });

  try {
    const listings = client.db(process.env.DBNAME).collection('listingsAndReviews');
    console.log(listings);
    return { listings };
  } catch (e) {
    console.error(
      `Unable to establish collection handles in resourceDAO: ${e}`,
    );
    return null;
  }
};
