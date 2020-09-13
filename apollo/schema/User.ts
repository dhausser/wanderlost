import { objectType } from '@nexus/schema'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id')
    t.string('name')
    t.string('email')
    t.string('password')
    t.string('resetToken', { nullable: true })
    t.float('resetTokenExpiry', { nullable: true })
    t.field('permissions', {
      type: 'Permission',
      list: [false],
      nullable: true,
    })
    t.list.field('cart', { type: 'CartItem' })
    t.field('orders', {
      type: 'OrderItem',
      list: [false],
      nullable: true,
    })
  },
})
