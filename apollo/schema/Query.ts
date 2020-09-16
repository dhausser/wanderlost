import { objectType, stringArg, intArg, idArg } from '@nexus/schema'

import { item } from './Item/item'
import { items } from './Item/items'
import { allItems } from './Item/allItems'
import { user } from './User/user'
import { users } from './User/users'
import { order } from './Order/order'
import { orders } from './Order/orders'

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('allItems', {
      type: 'Item',
      list: [false],
      args: {
        searchTerm: stringArg(),
      },
      resolve: allItems,
    })

    t.field('items', {
      type: 'ItemConnection',
      args: {
        offset: intArg(),
        limit: intArg(),
      },
      resolve: items,
    })

    t.field('item', {
      type: 'Item',
      nullable: true,
      args: {
        id: idArg({ required: true }),
      },
      resolve: item,
    })

    t.field('user', {
      type: 'User',
      nullable: true,
      resolve: user,
    })

    t.field('users', {
      type: 'User',
      list: [false],
      nullable: true,
      resolve: users,
    })

    t.field('order', {
      type: 'Order',
      nullable: true,
      args: {
        id: idArg({ required: true }),
      },
      resolve: order,
    })

    t.field('orders', {
      type: 'Order',
      list: [false],
      resolve: orders,
    })
  },
})
