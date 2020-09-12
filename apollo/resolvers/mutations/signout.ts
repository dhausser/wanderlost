import { Context } from '../../types'
import { setCookie } from '../../cookies'

export function signout(_: any, __: any, { res }: Context) {
  setCookie(res, 'token', '', {})
  return { message: 'Goodbye!' }
}
