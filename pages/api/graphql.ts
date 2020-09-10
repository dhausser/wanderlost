import { ApolloServer } from 'apollo-server-micro'
import { createContext } from '../../apollo/context'
import { schema } from '../../apollo/schema'

const apolloServer = new ApolloServer({
  schema,
  context: (ctx) => {
    // console.log(ctx.req)
    // console.log(ctx.res)
    return createContext(ctx)
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
