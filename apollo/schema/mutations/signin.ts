import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function signin(_: any, { email, password }, { res, prisma }) {
  // 1. check if there is a user with that email
  const user = await prisma.user.findOne({ where: { email } })
  if (!user) {
    throw new Error(`No such user found for email ${email}`)
  }
  // 2. Check if their password is correct
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error('Invalid Password!')
  }

  // 3. generate the JWT Token
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET as string)

  // 4. Set the cookie with the token
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  })
  // res.end(res.getHeader('Set-Cookie'))

  // 5. Return the user
  return user
}
