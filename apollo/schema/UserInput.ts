import { objectType } from '@nexus/schema'

export const UserInput = objectType({
  name: 'UserInput',
  definition(t) {
    t.string('email')
    t.string('password')
    t.string('name')
  },
})
