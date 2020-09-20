import { useMutation, gql } from '@apollo/client'
import useForm from '../lib/useForm'
import Form from './styles/Form'
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'
import { Signup as SignupTypes, SignupVariables } from './__generated__/Signup'

const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`

function Signup() {
  const { inputs, handleChange } = useForm({
    email: '',
    name: '',
    password: '',
  })
  const [signup, { error, loading, data }] = useMutation<SignupTypes, SignupVariables>(SIGNUP_MUTATION, {
    variables: {
      email: inputs.email,
      name: inputs.name,
      password: inputs.password,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })

  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault()
        await signup()
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        {data && data.signup && <p>Signed up with {data.signup.email} — Please Sign In now</p>}
        <h2>Sign Up for an Account</h2>
        <Error error={error} />
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="email"
            value={inputs.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
            autoComplete="name"
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
            autoComplete="new-password"
          />
        </label>

        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  )
}

export default Signup
export { SIGNUP_MUTATION }
