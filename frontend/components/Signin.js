import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Form from './styles/Form'
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
    }
  }
`

export default function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Mutation
      mutation={SIGNIN_MUTATION}
      variables={{ email, password }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signup, { error, loading }) => (
        <Form
          method="post"
          onSubmit={async e => {
            e.preventDefault()
            await signup()
            setEmail('')
            setPassword('')
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
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </label>

            <button type="submit">Sign In!</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  )
}
