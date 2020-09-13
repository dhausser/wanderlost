import { objectType } from '@nexus/schema'

export const ItemConnection = objectType({
  name: 'ItemConnection',
  definition(t) {
    t.field('items', {
      type: 'Item',
      list: [false],
    })
    t.int('total')
    t.boolean('hasMore')
  },
})
