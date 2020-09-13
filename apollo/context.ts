import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

interface Request extends NextApiRequest {
  userId: string
}

interface Response extends NextApiResponse {
  cookie: any
}

const prisma = new PrismaClient()

export interface Context {
  req: Request
  res: Response
  prisma: PrismaClient
}

// TODO: Use createContext for both SSR and CSR
export function createContext(): Partial<Context> {
  return {
    prisma,
  }
}
