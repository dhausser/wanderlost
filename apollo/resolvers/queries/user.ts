import { Context } from '../../types'

export function user(_: any, __: null, { user }: Context) {
  if (user) {
    return user
  }
  return null
}
