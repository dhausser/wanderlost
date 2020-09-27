import { useMutation, gql } from '@apollo/client'
import { useForm } from 'react-hook-form'
import Form from './styles/Form'
import Error, { FormError } from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'
import { ResetPassword, ResetPasswordVariables } from './__generated__/ResetPassword'

interface Props {
  resetToken: string
}

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      email
      name
      password
    }
  }
`

function Reset({ resetToken }: Props): JSX.Element {
  const defaultValues = {
    password: '',
    confirmPassword: '',
  }
  const { register, handleSubmit, reset, errors } = useForm({ defaultValues })
  const [resetPassword, { error, loading, data }] = useMutation<
    ResetPassword,
    ResetPasswordVariables
  >(RESET_PASSWORD_MUTATION, { refetchQueries: [{ query: CURRENT_USER_QUERY }] })

  async function onSubmit(data: ResetPasswordVariables) {
    await resetPassword({
      variables: {
        resetToken,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
    })
    reset(defaultValues)
  }

  return (
    <Form method="post" onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Reset your password</h2>
        {data &&
          data.resetPassword &&
          data.resetPassword.email &&
          'Password has been reset successfully'}
        <Error error={error} />
        <label>Password</label>
        <input type="password" name="password" ref={register({ required: true })} />
        <FormError error={errors.password} />

        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" ref={register({ required: true })} />
        <FormError error={errors.confirmPassword} />

        <button type="submit">Reset your password</button>
      </fieldset>
    </Form>
  )
}

export default Reset
