import { DataSource } from 'apollo-datasource';

let orders;

class StoreAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  static async injectDB(conn) {
    if (orders) {
      return;
    }
    try {
      orders = await conn.db(process.env.MFLIX_NS).collection('orders');
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }
}

export default StoreAPI;
