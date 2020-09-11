import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../apollo/schema'

import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

// TODO: This block is duplicated in ./context.ts
const prisma = new PrismaClient()

export interface Context {
  req: NextApiRequest
  res: NextApiResponse
  prisma: PrismaClient
}

const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }) => ({
    req,
    res,
    prisma,
  }),
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
