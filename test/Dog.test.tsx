import { MockedProvider } from '@apollo/client/testing'
import { screen, render, cleanup } from '@testing-library/react'

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

afterEach(cleanup)

it('renders without error', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Dog name="Buck" />
    </MockedProvider>
  )
})

it('should render dog', async () => {
  const dogMock = {
    request: {
      query: GET_DOG_QUERY,
      variables: { name: 'Buck' },
    },
    result: {
      data: { dog: { id: 1, name: 'Buck', breed: 'poodle' } },
    },
  }

  const { findByText } = render(
    <MockedProvider mocks={[dogMock]} addTypename={false}>
      <Dog name="Buck" />
    </MockedProvider>
  )

  const text = await findByText('Buck is a poodle')
  expect(text).toBeInTheDocument
})
