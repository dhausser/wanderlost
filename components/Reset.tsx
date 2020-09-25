import { useMutation, gql } from '@apollo/client'
import useForm from '../lib/useForm'
import Form from './styles/Form'
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'
import {
  ResetPassword,
  ResetPasswordVariables,
} from './__generated__/ResetPassword'

interface Props {
  resetToken: string
}

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      email
      name
      password
    }
  }
`

function Reset({ resetToken }: Props) {
  const { inputs, handleChange, resetForm } = useForm({
    password: '',
    confirmPassword: '',
  })
  const [resetPassword, { error, loading, data }] = useMutation<
    ResetPassword,
    ResetPasswordVariables
  >(RESET_PASSWORD_MUTATION, {
    variables: {
      resetToken,
      password: inputs.password,
      confirmPassword: inputs.confirmPassword,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })
  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault()
        await resetPassword()
        resetForm()
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Reset your password</h2>
        {data &&
          data.resetPassword &&
          data.resetPassword.email &&
          'Password has been reset successfully'}
        <Error error={error} />
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="password"
            value={inputs.password}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="confirmPassword">
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirmPassword"
            value={inputs.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Reset your password</button>
      </fieldset>
    </Form>
  )
}

export default Reset
