import { Context } from '../../types'

export function signout(_: any, __: any, { res }: Context) {
  res.clearCookie('token')
  return { message: 'Goodbye!' }
}
