import { PrismaClient, User } from '@prisma/client'

export declare enum Permissions {
  ADMIN,
  ITEMCREATE,
  ITEMDELETE,
  ITEMUPDATE,
  PERMISSIONUPDATE,
  USER,
}

export declare interface UserInput {
  email: string
  password: string
  name: string
  permissions: Permissions[]
}

export declare interface ItemInput {
  id: string
  title: string
  description: string
  image: string
  largeImage: string
  price: number
  user: any
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
