import { objectType } from '@nexus/schema'

export const OrderItem = objectType({
  name: 'OrderItem',
  definition(t) {
    t.id('id')
    t.string('title')
    t.string('description')
    t.string('image')
    t.string('largeImage')
    t.int('price')
    t.int('quantity')
    t.field('user', {
      type: 'User',
      nullable: true,
    })
  },
})
