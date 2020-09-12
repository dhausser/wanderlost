import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../apollo/schema'
import { cookies } from '../../apollo/cookies'

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

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export default cookies(handler)
