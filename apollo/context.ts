import { PrismaClient } from '@prisma/client'
import { ApiRequest, ApiResponse } from '../graphql/utils/cookies'

const prisma = new PrismaClient()

export interface Context {
  req: ApiRequest
  res: ApiResponse
  prisma: PrismaClient
}

// TODO: Use createContext for both SSR and CSR
export function createContext(): Partial<Context> {
  return {
    prisma,
  }
}
