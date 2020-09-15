import { setCookie } from '../../cookies'

export function signout(_, __, { res }) {
  setCookie(res, 'token', '', {})
  return { message: 'Goodbye!' }
}
