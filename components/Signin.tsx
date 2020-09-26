import { useMutation, gql } from '@apollo/client'
import { useForm } from 'react-hook-form'
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

function Signin(): JSX.Element {
  const defaultValues: SigninVariables = { email: '', password: '' }
  const { register, handleSubmit, reset, errors } = useForm({ defaultValues })
  const [signin, { loading, error }] = useMutation<SigninTypes, SigninVariables>(SIGNIN_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })

  async function onSubmit(data: SigninVariables) {
    await signin({
      variables: {
        email: data.email,
        password: data.password,
      },
    })
    reset(defaultValues)
  }

  return (
    <Form method="post" onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign into your Account</h2>
        <Error error={error} />
        <label>Email</label>
        <input type="email" name="email" ref={register({ required: true })} />
        {errors.email && <p>This is required</p>}

        <label>Password</label>
        <input type="password" name="password" ref={register({ required: true })} />
        {errors.password && <p>This is required</p>}

        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  )
}

export default Signin
