import { objectType } from '@nexus/schema'

export const Order = objectType({
  name: 'Order',
  definition(t) {
    t.id('id')
    t.list.field('items', { type: 'OrderItem' })
    t.int('total')
    t.field('user', { type: 'User' })
    t.string('charge')
    t.string('createdAt')
    t.string('updatedAt')
  },
})
