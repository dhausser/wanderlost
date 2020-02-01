import { DataSource } from 'apollo-datasource';

let user;

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  static async injectDB(conn) {
    if (user) {
      return;
    }
    try {
      user = await conn.db(process.env.MFLIX_NS).collection('user');
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }
}

export default UserAPI;
