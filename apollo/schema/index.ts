import * as CartItem from './CartItem'
import * as Item from './Item'
import * as ItemConnection from './ItemConnection'
import * as Order from './Order'
import * as OrderItem from './OrderItem'
import * as SuccessMessage from './SuccessMessage'
import * as User from './User'
import * as UserInput from './UserInput'
import * as ItemsInput from './ItemsInput'
import * as Permission from './Permission'

import { makeSchema } from '@nexus/schema'
import path from 'path'
import { Query } from './queries'
import { Mutation } from './mutations'

export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    CartItem,
    Item,
    ItemConnection,
    Order,
    OrderItem,
    SuccessMessage,
    User,
    UserInput,
    ItemsInput,
    Permission,
  ],
  typegenAutoConfig: {
    contextType: 'ctx.Context',
    sources: [
      {
        source: path.join(process.cwd(), 'apollo', 'Context.ts'),
        alias: 'ctx',
      },
    ],
    // sources: [{ source: '.prisma/client', alias: 'PrismaClient' }],
    // contextType: '{ prisma: PrismaClient.PrismaClient }',
    // sources: [{ source: '.prisma/client', alias: 'PrismaClient' }],
  },
  outputs: {
    schema: path.join(process.cwd(), 'schema.graphql'),
    typegen: path.join(process.cwd(), 'node_modules/@types/nexus-typegen/index.d.ts'),
  },
  prettierConfig: path.join(process.cwd(), 'package.json'),
})
