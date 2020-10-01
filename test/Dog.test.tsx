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

describe('Dog', () => {
  // automatically unmount and cleanup DOM after the test is finished.
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

  it('should render loading state initially', async () => {
    const { findByText } = render(
      <MockedProvider mocks={[]}>
        <Dog name="Buck" />
      </MockedProvider>
    )

    const text = await findByText('Loading...')
    expect(text).toBeInTheDocument
    // expect(getByText('Loading...')).toBeInTheDocument
  })

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
    expect(text).toBeInTheDocument
  })
})
