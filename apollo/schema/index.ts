import { makeSchema } from '@nexus/schema'
import path from 'path'

import * as Item from './Item'
import * as Order from './Order'
import * as User from './User'

export const schema = makeSchema({
  types: [Item, Order, User],
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
