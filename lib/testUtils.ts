import '@testing-library/jest-dom/extend-expect'
import casual from 'casual'
import { GetItem_item } from '../components/__generated__/GetItem'
import { GetOrder_order, GetOrder_order_items } from '../components/__generated__/GetOrder'
import {
  GetCurrentUser_user,
  GetCurrentUser_user_cart,
} from '../components/__generated__/GetCurrentUser'

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

const fakeCartItem = (overrides: Partial<GetCurrentUser_user_cart>): GetCurrentUser_user_cart => ({
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

export { LocalStorageMock, fakeItem, fakeUser, fakeCartItem, fakeOrder, fakeOrderItem }
