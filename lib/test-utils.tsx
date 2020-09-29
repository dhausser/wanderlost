import React from 'react'
import { render as defaultRender, RenderResult } from '@testing-library/react'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import { NextRouter } from 'next/router'
import '@testing-library/jest-dom/extend-expect'
import casual from 'casual'

export * from '@testing-library/react'

import { GetItem_item } from '../components/__generated__/GetItem'
import {
  GetOrder_order,
  GetOrder_order_items,
} from '../components/__generated__/GetOrder'
import {
  GetCurrentUser_user,
  GetCurrentUser_user_cart,
} from '../components/__generated__/GetCurrentUser'

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
type RenderOptions = DefaultParams[1] & { router?: Partial<NextRouter> }

export function render(
  ui: RenderUI,
  { wrapper, router, ...options }: RenderOptions = {}
): RenderResult {
  if (!wrapper) {
    wrapper = ({ children }) => {
      const Wrapper = (
        <RouterContext.Provider value={{ ...mockRouter, ...router }}>
          {children}
        </RouterContext.Provider>
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
  price: 5000,
  image: 'dog-small.jpg',
  title: 'dogs are best',
  description: 'dogs',
  largeImage: 'dog.jpg',
})

const fakeUser = (): Omit<GetCurrentUser_user, 'permissions'> => ({
  __typename: 'User',
  id: '4234',
  name: casual.name,
  email: casual.email,
  // permissions: [Permission.ADMIN],
  // orders: [],
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
  overrides: Partial<GetCurrentUser_user_cart>
): GetCurrentUser_user_cart => ({
  __typename: 'CartItem',
  id: 'omg123',
  quantity: 3,
  item: fakeItem(),
  // user: fakeUser(),
  ...overrides,
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

export {
  LocalStorageMock,
  fakeItem,
  fakeUser,
  fakeCartItem,
  fakeOrder,
  fakeOrderItem,
}
