import { objectType } from '@nexus/schema'

export const Item = objectType({
  name: 'Item',
  definition(t) {
    t.id('id')
    t.string('title')
    t.string('description')
    t.string('image', { nullable: true })
    t.string('largeImage', { nullable: true })
    t.int('price')
    t.field('user', { type: 'User' })
  },
})
