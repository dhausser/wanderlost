import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

import { ApolloServer } from 'apollo-server-express'
import { PrismaClient } from '@prisma/client'

import typeDefs from './schema'
import resolvers from './resolvers'
import { TokenInterface } from './types'

dotenv.config()
const app = express()
const port = process.env.PORT || 4000;
const prisma = new PrismaClient()

app.use(cookieParser())

// decode the JWT so we can get the user Id on each request
app.use((req: any, res, next) => {
  const { token } = req.cookies
  if (token) {
    const { userId } = jwt.verify(
      token,
      process.env.APP_SECRET as string,
    ) as TokenInterface
    // put the userId onto the req for future requests to access
    req.userId = userId
  }
  next()
})

app.use(async (req: any, res, next) => {
  if (!req.userId) return next()
  const user = await prisma.user.findOne({
    where: { id: req.userId },
    include: { cart: { include: { item: true } } },
  })
  if (user && user.id) {
    req.user = user
  }
  next()
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }: { req: any; res: any }) => {
    return { req, res, prisma, user: req.user }
  },
})

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: [process.env.FRONTEND_URL as string],
  },
})

app.listen(port, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
  ),
)
