import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { NextApiResponse } from 'next'

interface Options {
  expires?: Date
  maxAge?: number
}

interface TokenInterface {
  userId: string
}

/**
 * This sets `cookie` on `res` object
 */
const setCookie = (res: NextApiResponse, name: string, value: unknown, options: Options = {}) => {
  const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}

/**
 * Decode the userId from the request cookies JWT token
 */
const decodeIncomingRequestCookies = (req) => {
  const { token } = req.cookies
  console.log(token)
  if (token) {
    const decoded = jwt.verify(token, process.env.APP_SECRET)
    // put the userId onto the req for future requests to access
    req.userId = (decoded as TokenInterface).userId
  }
}

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
const cookies = (handler) => (req, res) => {
  decodeIncomingRequestCookies(req)

  res.cookie = (name, value, options) => setCookie(res, name, value, options)

  return handler(req, res)
}

/**
 * Clear Cookies to signout
 */
const clearCookies = (req, res) => {
  res.setHeader('Set-Cookie', 'token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT')
}

export { cookies, clearCookies }
