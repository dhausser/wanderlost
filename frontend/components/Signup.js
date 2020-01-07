import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

function Signup() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [signup, { error, loading }] = useMutation(SIGNUP_MUTATION, {
    variables: { name, password, email },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await signup();
        console.log(res);
        setName('');
        setPassword('');
        setEmail('');
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign Up for an Account</h2>
        <Error error={error} />
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
        <label htmlFor="name">
                Name
          <input
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="password">
                Password
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
}

export default Signup;
