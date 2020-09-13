import { objectType } from '@nexus/schema'

export const CartItem = objectType({
  name: 'CartItem',
  definition(t) {
    t.id('id')
    t.int('quantity')
    t.field('item', {
      type: 'Item',
      nullable: true,
    })
    t.field('user', { type: 'User' })
  },
})
