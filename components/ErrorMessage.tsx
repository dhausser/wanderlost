import styled from 'styled-components'
import { ApolloError } from '@apollo/client'

interface Props {
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

const DisplayError = ({ error }: Props) => {
  if (!error || !error.message) return null
  // @ts-ignore
  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    // @ts-ignore
    return error.networkError.result.errors.map((err: ApolloError) => (
      <ErrorStyles key={err.message}>
        <p data-test="graphql-error">
          <strong>Shoot!</strong>
          {err.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorStyles>
    ))
  }
  return (
    <ErrorStyles>
      <p data-test="graphql-error">
        <strong>Shoot!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </ErrorStyles>
  )
}

export default DisplayError
