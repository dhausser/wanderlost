import { PrismaClient } from '@prisma/client'

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
]

interface UserInput {
  email: string
  password: string
  name: string
}

export interface Context {
  prisma: PrismaClient
}

module.exports = {
  Query: {
    books: () => books,
    users: () => [],
  },
  Mutation: {
    signup: async (
      _: any,
      { email, password, name }: UserInput,
      { prisma }: Context,
    ) => {
      console.log({ email, password, name })
      const allUsers = await prisma.user.findMany()
      console.log(allUsers)
      return { id: 1, email, name }
    },
  },
}
