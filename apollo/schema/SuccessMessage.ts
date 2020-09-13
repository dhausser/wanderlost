import { objectType } from '@nexus/schema'

export const SuccessMessage = objectType({
  name: 'SuccessMessage',
  definition(t) {
    t.string('message')
  },
})
