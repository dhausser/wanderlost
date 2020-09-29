import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

interface Options {
  httpOnly?: boolean
  expires?: Date
  maxAge?: number
}

interface TokenInterface {
  userId: string
}

export interface ApiRequest extends NextApiRequest {
  userId: string
}

export interface ApiResponse extends NextApiResponse {
  cookie: (name: string, value: string, options: Options) => void
}

/**
 * This sets `cookie` on `res` object
 */
const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: Options = {}
): void => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if (options.maxAge) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}

/**
 * Decode the userId from the request cookies JWT token
 */
const decodeIncomingRequestCookies = (req: ApiRequest) => {
  const { token } = req.cookies
  if (token) {
    const decoded = jwt.verify(token, process.env.APP_SECRET as string)
    // put the userId onto the req for future requests to access
    req.userId = (decoded as TokenInterface).userId
  }
}

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
const cookies = (handler: NextApiHandler) => (
  req: ApiRequest,
  res: ApiResponse
): void | Promise<void> => {
  decodeIncomingRequestCookies(req)

  res.cookie = (name: string, value: string, options: Options) =>
    setCookie(res, name, value, options)

  return handler(req, res)
}

export { cookies, setCookie }
