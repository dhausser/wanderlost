import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Davy',
      email: 'davy@prisma.io',
      password: 'dogs',
      permissions: 'ADMIN',
    },
  })

  // const deletedUser = await prisma.user.delete({
  //   where: { email: 'sarah@prisma.io' },
  // })

  // const allUsers = await prisma.user.findMany()
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })
