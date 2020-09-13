import { makeSchema } from '@nexus/schema'
import path from 'path'
import * as types from './schema'

export const schema = makeSchema({
  types,
  // Query,
  // Mutation,
  // CartItem,
  // Item,
  // ItemConnection,
  // Order,
  // OrderItem,
  // SuccessMessage,
  // User,
  // UserInput,
  // ItemsInput,
  // Permission,
  // ],
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
