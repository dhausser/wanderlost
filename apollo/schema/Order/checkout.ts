import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27',
  typescript: true,
})

export async function checkout(_, { token }, { req, prisma }) {
  if (!req.userId) throw new Error('You must be signed in to complete this order.')
  const user = await prisma.user.findOne({
    where: { id: req.userId },
    include: { cart: true },
  })
  const amount = user.cart.reduce(
    (tally: number, cartItem: any) => tally + cartItem.item.price * cartItem.quantity,
    0
  )
  const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'USD',
    confirm: true,
    payment_method: token,
  })
  const orderItems = user.cart.map((cartItem: any) => {
    const { title, description, price, image, largeImage } = cartItem.item
    const orderItem = {
      title,
      description,
      price,
      image,
      largeImage,
      quantity: cartItem.quantity,
      user: { connect: { id: user.id } },
    }
    return orderItem
  })
  const order = await prisma.order.create({
    data: {
      total: paymentIntent.amount,
      charge: paymentIntent.id,
      items: { create: orderItems },
      user: { connect: { id: user.id } },
    },
    include: { items: true },
  })

  const cartItemIds = user.cart.map((cartItem: any) => cartItem.id)
  await prisma.cartItem.deleteMany({
    where: {
      id: {
        in: cartItemIds,
      },
    },
  })

  return order
}
