import { makeSchema, decorateType } from '@nexus/schema'
import { GraphQLDate } from 'graphql-iso-date'
import path from 'path'

import * as Item from './Item'
import * as Order from './Order'
import * as User from './User'

export const GQLDate = decorateType(GraphQLDate, {
  rootTyping: 'Date',
  asNexusMethod: 'date',
})

export const schema = makeSchema({
  types: [Item, Order, User, GraphQLDate],
  typegenAutoConfig: {
    contextType: 'ctx.Context',
    sources: [
      {
        source: path.join(process.cwd(), 'apollo', 'context.ts'),
        alias: 'ctx',
      },
    ],
  },
  outputs: {
    schema: path.join(process.cwd(), 'schema.graphql'),
    typegen: path.join(process.cwd(), 'node_modules/@types/nexus-typegen/index.d.ts'),
  },
  prettierConfig: path.join(process.cwd(), 'package.json'),
})
