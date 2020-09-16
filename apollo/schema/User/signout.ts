import { setCookie } from './utils'

export function signout(_, __, { res }) {
  setCookie(res, 'token', '', {})
  return { message: 'Goodbye!' }
}
