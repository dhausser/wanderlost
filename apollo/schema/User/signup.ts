import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function signup(_, { email, password, name }, { res, prisma }) {
  const user = await prisma.user.create({
    data: {
      email: email.toLocaleLowerCase(),
      name,
      password: await bcrypt.hash(password, 10),
      permissions: { set: ['USER', 'ITEMCREATE', 'ITEMDELETE', 'ITEMUPDATE'] },
    },
  })
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET as string)
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
  })
  return user
}
