import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
}

export interface Context {
  req: NextApiRequest
  res: NextApiResponse
  prisma: PrismaClient
}

// TODO: Use createContext for both SSR and CSR
export function createContext(): Partial<Context> {
  return {
    prisma,
  }
}
