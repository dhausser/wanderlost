import styled from 'styled-components'
import { ApolloError } from '@apollo/client'
import { FieldErrors } from 'react-hook-form'

interface DisplayErrorProps {
  error: ApolloError | undefined | null
}

const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`

const DisplayError = ({ error }: DisplayErrorProps): JSX.Element | null => {
  if (!error) return null
  if (
    error.networkError &&
    // @ts-expect-error as networkError exits on ApolloError
    error.networkError.result &&
    // @ts-expect-error as networkError exits on ApolloError
    error.networkError.result.errors.length
  ) {
    // @ts-expect-error as networkError exits on ApolloError
    return error.networkError.result.errors.map((err: ApolloError) => (
      <ErrorStyles key={err.message}>
        <p data-testid="graphql-error">
          <strong>Shoot!</strong>
          {err.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorStyles>
    ))
  }
  return (
    <ErrorStyles>
      <p data-testid="graphql-error">
        <strong>Shoot!</strong>
        {error?.message.replace('GraphQL error: ', '')}
      </p>
    </ErrorStyles>
  )
}

function FormError({ error }: FieldErrors): JSX.Element | null {
  if (error) {
    switch (error.type) {
      case 'required':
        return <p>This is required</p>
      case 'minLength':
        return <p>Your last name need minmium 2 charcaters</p>
      case 'pattern':
        return <p>Enter a valid email address</p>
      case 'min':
        return <p>Minmium age is 18</p>
      case 'validate':
        return <p>Username is already used</p>
      default:
        return null
    }
  }

  return null
}

export default DisplayError
export { DisplayError, FormError }
