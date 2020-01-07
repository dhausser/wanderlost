const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  authenticatedUser(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info,
    );
  },
  async users(parent, args, ctx, info) {
    // 1. Check ig they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    // 2. Check if the user has the permissions to query all the users
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    // 3. If they do, query all users
    return ctx.db.query.users({}, info);
  },
  async order(parent, args, ctx, info) {
    // 1. Make sure they are logged in
    if (!ctx.request.userId) {
      throw new Error('You aren\'t logged in!');
    }
    // 2. Query the current order
    const order = await ctx.db.query.order({
      where: { id: args.id },
    }, info);
    // 3. Check if they have the permission to view this order
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes('ADMIN');
    if (!ownsOrder || !hasPermissionToSeeOrder) {
      throw new Error('You can\'t see this buddd');
    }
    // 4. Return the order
    return order;
  },
  async allOrders(parent, args, ctx, info) {
    const { userId } = ctx.request;
    // 1. Make sure they are logged in
    if (!userId) {
      throw new Error('You must be signed in!');
    }
    // 2. Query the current order
    return ctx.db.query.orders({
      where: { user: { id: userId } },
    }, info);
  },
};

module.exports = Query;
