import { Context } from '../../types'
import { clearCookies } from '../../cookies'

export function signout(_: any, __: any, { res }: Context) {
  clearCookies(res)
  return { message: 'Goodbye!' }
}
