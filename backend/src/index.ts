import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getAllUsers() {
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
  return allUsers
}

async function createUser() {
  const user = await prisma.user.create({
    data: {
      name: 'Davy Hausser',
      email: 'dhausser@prisma.io',
      permissions: 'ADMIN',
      password: '123456',
    },
  })
  return user
}

async function deleteUser() {
  const deletedUser = await prisma.user.delete({
    where: { email: 'dhausser@prisma.io' },
  })
}

async function main() {
  await createUser()
  // await deleteUser()
  await getAllUsers()
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })
