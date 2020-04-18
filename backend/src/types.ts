import { PrismaClient, User } from '@prisma/client'

export enum Permissions {
  ADMIN,
  ITEMCREATE,
  ITEMDELETE,
  ITEMUPDATE,
  PERMISSIONUPDATE,
  USER,
}

export interface UserInput {
  email: string
  password: string
  name: string
  permissions: Permissions[]
}

export interface ItemInput {
  id: string
  title: string
  description: string
  image: string
  largeImage: string
  price: number
  user: any
}

export interface Item {
  id: string
  title: string
  description: string
  image: string
  largeImage: string
  price: number
  user: any
  createdAt: String
  updatedAt: String
}

export interface CartItem extends Item {
  quantity: number
  item: Item
}

export interface Context {
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

export interface TokenInterface {
  email: string
  name: string
  userId: number
}

export interface Pagination {
  offset: number
  limit: number
}

export interface ItemConnection {
  cursor: number
  hasMore: boolean
  items: Item[]
}
