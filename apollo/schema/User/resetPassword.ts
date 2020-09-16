import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function resetPassword(_: any, { password, confirmPassword, resetToken }, { res, prisma }) {
  // 1. check if the passwords match
  if (password !== confirmPassword) {
    throw new Error("Yo Passwords don't match!")
  }
  //** TODO **//
  // 2. check if its a legit reset token

  // 3. Check if its expired
  const [user] = await prisma.user.findMany({
    where: { resetToken },
  })
  if (!user) {
    throw new Error('This token is either invalid or expired!')
  }
  // 4. Hash their new password
  const hash = await bcrypt.hash(password, 10)
  // 5. Save the new password to the user and remove old resetToken fields
  const updatedUser = await prisma.user.update({
    where: { email: user.email },
    data: {
      password: hash,
      resetToken: null,
      resetTokenExpiry: null,
    },
  })
  // 6. Generate JWT
  const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET as string)
  // 7. Set the JWT cookie
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  })
  // 8. return the new user
  return updatedUser
}
