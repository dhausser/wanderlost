import { MockedProvider } from '@apollo/client/testing'
import { render } from '@testing-library/react'

// The component AND the query need to be exported
import { GET_DOG_QUERY, Dog } from '../components/Dog'

const mocks = [
  {
    request: {
      query: GET_DOG_QUERY,
      variables: {
        name: 'Buck',
      },
    },
    result: {
      data: {
        dog: { id: '1', name: 'Buck', breed: 'bulldog' },
      },
    },
  },
]

it('renders without error', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Dog name="Buck" />
    </MockedProvider>
  )
})
