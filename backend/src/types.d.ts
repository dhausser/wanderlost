import { PrismaClient } from '@prisma/client'

export declare interface UserInput {
  email: string
  password: string
  name: string
}

export declare interface Context {
  req: {
    userId: string | undefined
    headers: {
      authorization: string | undefined
    }
  }
  res: any
  prisma: PrismaClient
  user: any
}

export declare interface TokenInterface {
  email: string
  name: string
  userId: number
}
