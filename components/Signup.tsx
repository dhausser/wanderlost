import { useMutation, gql } from '@apollo/client'
import { useForm } from 'react-hook-form'
import Form from './styles/Form'
import Error, { FormError } from './ErrorMessage'
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

function Signup(): JSX.Element {
  const defaultValues = { email: '', name: '', password: '' }
  const { register, handleSubmit, reset, errors } = useForm({ defaultValues })
  const [signup, { error, loading, data }] = useMutation<
    SignupTypes,
    SignupVariables
  >(SIGNUP_MUTATION, { refetchQueries: [{ query: CURRENT_USER_QUERY }] })

  async function onSubmit(data: SignupVariables) {
    await signup({
      variables: {
        email: data.email,
        name: data.name,
        password: data.password,
      },
    })
    reset(defaultValues)
  }

  return (
    <Form method="post" onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={loading} aria-busy={loading} data-testid="loading">
        {data && data.signup && (
          <p>Signed up with {data.signup.email} — Please Sign In now</p>
        )}
        <h2>Sign Up for an Account</h2>
        <Error error={error} />
        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="email"
            autoComplete="email"
            ref={register({ required: true })}
          />
        </label>
        <FormError error={errors.email} />
        {errors.email && <p>This is required</p>}

        <label>
          Name
          <input
            type="text"
            name="name"
            placeholder="name"
            autoComplete="name"
            ref={register({ required: true })}
          />
        </label>
        <FormError error={errors.name} />

        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="password"
            autoComplete="new-password"
            ref={register({ required: true })}
          />
        </label>
        <FormError error={errors.password} />

        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  )
}

export default Signup
export { SIGNUP_MUTATION, Signup }
