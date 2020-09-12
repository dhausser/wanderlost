import { Context } from '../../types'
import { clearCookies } from '../../cookies'

export function signout(_: any, __: any, { req, res }: Context) {
  clearCookies(req, res)
  return { message: 'Goodbye!' }
}
