import { useMutation, gql } from '@apollo/client'
import Form from './styles/Form'
import Error, { FormError } from './ErrorMessage'
import { useForm } from 'react-hook-form'
import {
  RequestReset as RequestResetTypes,
  RequestResetVariables,
} from './__generated__/RequestReset'

const REQUEST_RESET_MUTATION = gql`
  mutation RequestReset($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`

function RequestReset(): JSX.Element {
  const defaultValues = { email: '' }
  const { register, handleSubmit, reset: resetForm, errors } = useForm({
    defaultValues,
  })
  const [reset, { loading, error, called }] = useMutation<
    RequestResetTypes,
    RequestResetVariables
  >(REQUEST_RESET_MUTATION)

  async function onSubmit(data: RequestResetVariables) {
    await reset({
      variables: {
        email: data.email,
      },
    })
    resetForm(defaultValues)
  }

  return (
    <Form method="post" data-tested="form" onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Request a password reset</h2>
        <Error error={error} />
        {!error && !loading && called && (
          <p>Success! Check your email for a reset link!</p>
        )}
        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="email"
            ref={register({ required: true })}
          />
        </label>
        <FormError error={errors.email} />

        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  )
}

export default RequestReset
export { REQUEST_RESET_MUTATION }
