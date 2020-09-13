import { inputObjectType } from '@nexus/schema'

export const ItemsInput = inputObjectType({
  name: 'ItemsInput',
  definition(t) {
    t.string('title')
    t.string('description')
  },
})
