import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Context, UserInput } from './types'

export default {
  Query: {
    authenticatedUser(_: any, __: null, { req, prisma, user }: Context) {
      if (user) {
        console.log('User present in context', user.email)
        return user
      }
      return null
      // // console.log(userId)
      // if (!req.userId) {
      //   return null
      // }
      // return prisma.user.findOne({
      //   where: { id: req.userId },
      // })
    },
    users(_: any, __: null, { prisma }: Context) {
      return prisma.user.findMany()
    },
  },
  Mutation: {
    async signup(
      _: any,
      { email, password, name }: UserInput,
      { res, prisma }: Context,
    ) {
      const user = await prisma.user.create({
        data: {
          email: email.toLocaleLowerCase(),
          name,
          password: await bcrypt.hash(password, 10),
        },
      })
      const token = jwt.sign(
        { userId: user.id },
        process.env.APP_SECRET as string,
      )
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
      })
      return user
    },
    async signin(
      _: any,
      { email, password }: UserInput,
      { res, prisma }: Context,
    ) {
      // 1. check if there is a user with that email
      const user = await prisma.user.findOne({ where: { email } })
      if (!user) {
        throw new Error(`No such user found for email ${email}`)
      }
      // 2. Check if their password is correct
      const valid = await bcrypt.compare(password, user.password)
      if (!valid) {
        throw new Error('Invalid Password!')
      }
      // 3. generate the JWT Token
      const token = jwt.sign(
        { userId: user.id },
        process.env.APP_SECRET as string,
      )
      // 4. Set the cookie with the token
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      })
      // 5. Return the user
      return user
    },
  },
}
