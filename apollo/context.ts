import { ApolloContextValue } from '@apollo/client'
import { PrismaClient } from '@prisma/client'
import { NextApiHandler } from 'next'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
}

export function createContext(ctx: any): Context {
  return { prisma }
}
