import { useMutation, gql } from '@apollo/client'
import useForm from '../lib/useForm'
import Form from './styles/Form'
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'
import { Signin as SigninTypes, SigninVariables } from './__generated__/Signin'

const SIGNIN_MUTATION = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`

function Signin() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  })
  const [signin, { loading, error }] = useMutation<
    SigninTypes,
    SigninVariables
  >(SIGNIN_MUTATION, {
    variables: {
      email: inputs.email,
      password: inputs.password,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })
  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault()
        await signin()
        resetForm()
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign into your Account</h2>
        <Error error={error} />
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  )
}

export default Signin
