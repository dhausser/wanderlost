import { MockedProvider } from '@apollo/client/testing'
import { render, cleanup } from '@testing-library/react'

import { GET_DOG_QUERY, Dog } from '../components/Dog'

const dog = { id: 1, name: 'Buck', breed: 'poodle' }

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
        dog,
      },
    },
  },
]

afterEach(() => {
  cleanup()
})

it('renders without error', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Dog name="Buck" />
    </MockedProvider>
  )
})

// it('should render loading state initially', () => {
//   const { getByText } = render(
//     <MockedProvider mocks={[]}>
//       <Dog name="Buck" />
//     </MockedProvider>
//   )

//   expect(getByText('Loading...')).toBeInTheDocument
// })

it('should render dog', async () => {
  const dogMock = {
    request: {
      query: GET_DOG_QUERY,
      variables: { name: 'Buck' },
    },
    result: {
      data: { dog },
    },
  }

  const { findByText } = render(
    <MockedProvider mocks={[dogMock]} addTypename={false}>
      <Dog name="Buck" />
    </MockedProvider>
  )

  const text = await findByText('Buck is a poodle')
  console.log(text)

  expect(text).toBeInTheDocument
})
