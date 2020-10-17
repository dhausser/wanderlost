import { useState, FormEvent } from 'react'
import NProgress from 'nprogress'
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { loadStripe, StripeError, StripeCardElement } from '@stripe/stripe-js'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import SickButton from './styles/SickButton'
import { CURRENT_USER_QUERY } from './User'
import { useCart } from './LocalState'
import { USER_ORDERS_QUERY } from './OrderList'
import {
  Checkout as CheckoutTypes,
  CheckoutVariables,
} from './__generated__/Checkout'

const stripeLoad = loadStripe('pk_test_zywrqZUXI6crPwbzolFxAyF100AF2Wh0HA')

const CREATE_ORDER_MUTATION = gql`
  mutation Checkout($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`

const style = {
  base: {
    fontSize: '18px',
  },
}

function Checkout(): JSX.Element {
  return (
    <Elements stripe={stripeLoad}>
      <CheckoutForm />
    </Elements>
  )
}

function useCheckout() {
  const stripe = useStripe()
  const [error, setError] = useState<StripeError>()
  const elements = useElements()
  const { closeCart } = useCart()
  const router = useRouter()

  const [checkout] = useMutation<CheckoutTypes, CheckoutVariables>(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [
        { query: CURRENT_USER_QUERY },
        { query: USER_ORDERS_QUERY },
      ],
    }
  )

  // manually call the mutation once we have the stripe token

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // 1. Stop the form from submitting
    event.preventDefault()

    // 2. Start the page transition so show the user something is happening
    NProgress.start()

    // 3. Create the payment method
    if (!stripe) {
      return null
    }
    const {
      error: paymentError,
      paymentMethod,
    } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements?.getElement(CardElement) as StripeCardElement,
    })

    // 4. Handle any errors
    if (paymentError || !paymentMethod) {
      NProgress.done()
      return setError(error)
    }

    // 5. Send it to the server and charge it
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    }).catch((err) => {
      alert(err.message)
    })

    // 6. Change the page to the new order
    router.push({
      pathname: '/order',
      // @ts-expect-error as order is not of type void
      query: { id: order.data.checkout.id },
    })

    // 7. Close the cart
    closeCart()

    return null
  }

  return { error, handleSubmit }
}

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`

function CheckoutForm() {
  const { handleSubmit, error } = useCheckout()
  return (
    <CheckoutFormStyles onSubmit={(e) => handleSubmit(e)}>
      {error !== undefined ? (
        <p>{error !== undefined ? error.message : ''}</p>
      ) : (
        ''
      )}
      <CardElement options={{ style }} />
      <SickButton type="submit">Pay</SickButton>
    </CheckoutFormStyles>
  )
}

export default Checkout
