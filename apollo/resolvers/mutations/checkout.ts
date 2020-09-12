import Stripe from 'stripe'
import { Context, CartItem } from '../../types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27',
  typescript: true,
})

export async function checkout(_: any, { token }: { token: string }, { user, prisma }: Context) {
  if (!user) throw new Error('You must be signed in to complete this order.')
  const amount = user.cart.reduce(
    (tally: number, cartItem: CartItem) => tally + cartItem.item.price * cartItem.quantity,
    0
  )
  const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'USD',
    confirm: true,
    payment_method: token,
  })
  const orderItems = user.cart.map((cartItem: CartItem) => {
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

  /** TODO: Delete Many */
  // const cartItemIds = user.cart.map((cartItem: CartItem) => cartItem.id);
  // await prisma.cartItem.deleteMany({
  //   where: {
  //     id: cartItemIds,
  //   },
  // });
  user.cart.forEach(async ({ id }: { id: string }) => prisma.cartItem.delete({ where: { id } }))

  return order
}
