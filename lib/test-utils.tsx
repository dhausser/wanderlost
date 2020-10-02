import React from 'react'
import { render as defaultRender, RenderResult } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MockedProvider, MockedResponse } from '@apollo/react-testing'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import { NextRouter } from 'next/router'
import casual from 'casual'

import { GetItem_item } from '../components/__generated__/GetItem'
import {
  GetOrder_order,
  GetOrder_order_items,
} from '../components/__generated__/GetOrder'
import {
  GetCurrentUser,
  GetCurrentUser_user,
  GetCurrentUser_user_cart,
} from '../components/__generated__/GetCurrentUser'
import { DocumentNode } from 'graphql'

// --------------------------------------------------
// Override the default test render with our own
//
// You can override the router mock like this:
//
// const { baseElement } = render(<MyComponent />, {
//   router: { pathname: '/my-custom-pathname' },
// });
// --------------------------------------------------
type DefaultParams = Parameters<typeof defaultRender>
type RenderUI = DefaultParams[0]
type RenderOptions = DefaultParams[1] & {
  router?: Partial<NextRouter>
  mocks?: MockedResponse[]
  addTypename?: boolean
}

export function render(
  ui: RenderUI,
  { wrapper, router, mocks, addTypename, ...options }: RenderOptions = {}
): RenderResult {
  if (!wrapper) {
    wrapper = ({ children }) => {
      const Wrapper = (
        <MockedProvider mocks={mocks} addTypename={addTypename}>
          <RouterContext.Provider value={{ ...mockRouter, ...router }}>
            {children}
          </RouterContext.Provider>
        </MockedProvider>
      )
      return Wrapper
    }
  }

  return defaultRender(ui, { wrapper, ...options })
}

const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
}

// seed it so we get consistent results
casual.seed(777)

const fakeItem = (): GetItem_item => ({
  __typename: 'Item',
  id: 'abc123',
  title: 'dogs are best',
  price: 5000,
  description: 'dogs',
  image: 'dog-small.jpg',
  largeImage: 'dog.jpg',
})

const fakeUser = (): GetCurrentUser_user => ({
  __typename: 'User',
  id: '4234',
  name: 'Davy',
  email: 'davy@prisma.io',
  // @ts-expect-error not recognized
  permissions: ['ADMIN'],
  orders: [],
  cart: [],
})

const fakeOrderItem = (): GetOrder_order_items => ({
  __typename: 'OrderItem',
  id: casual.uuid,
  image: `${casual.word}.jpg`,
  title: casual.words(),
  price: 4234,
  quantity: 1,
  description: casual.words(),
})

const fakeOrder = (): GetOrder_order => ({
  __typename: 'Order',
  id: 'ord123',
  charge: 'ch_123',
  total: 40000,
  items: [fakeOrderItem(), fakeOrderItem()],
  createdAt: '2018-04 - 06T19: 24: 16.000Z',
  user: fakeUser(),
})

const fakeCartItem = (
  id = 'omg123'
): GetCurrentUser_user_cart & GetCurrentUser => ({
  __typename: 'CartItem',
  id,
  quantity: 3,
  item: fakeItem(),
  user: fakeUser(),
})

// Fake LocalStorage
class LocalStorageMock {
  private store: {
    [key: string]: string
  }

  constructor() {
    this.store = {}
  }

  clear(): void {
    this.store = {}
  }

  getItem(key: string): string | null {
    return this.store[key] || null
  }

  setItem(key: string, value: number): void {
    this.store[key] = value.toString()
  }

  removeItem(key: string): void {
    delete this.store[key]
  }
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
export {
  LocalStorageMock,
  fakeItem,
  fakeUser,
  fakeCartItem,
  fakeOrder,
  fakeOrderItem,
}
