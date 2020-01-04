import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Form from './styles/Form';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

export default function Signin() {
  const [email, setEmail] = useState('');
  const [reset, { loading, error, called }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: {
        email
      }
    }
  );

  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        await reset({ variables: { email } });
        setEmail('');
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Request a password reset</h2>
        <Error error={error} />
        {!error && !loading && called && (
        <p>Success! Check your email for a reset link</p>
        )}
        <label htmlFor="email">
              Email
          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
}
