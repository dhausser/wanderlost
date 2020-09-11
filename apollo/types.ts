import { PrismaClient } from '@prisma/client'

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
  createdAt: string
  updatedAt: string
}

export interface CartItem extends Item {
  quantity: number
  item: Item
}

export interface Context {
  req: any
  res: any
  user: any
  prisma: PrismaClient
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
