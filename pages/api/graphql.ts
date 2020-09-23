import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../graphql/schema'
import { cookies } from '../../graphql/utils'

const prisma = new PrismaClient()

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
