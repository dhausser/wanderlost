import { createContext, useState, useContext } from 'react'

interface Props {
  children: JSX.Element
}

const LocalStateContext = createContext({
  cartOpen: false,
  toggleCart: function () {
    return
  },
  closeCart: function () {
    return
  },
  openCart: function () {
    return
  },
})
const LocalStateProvider = LocalStateContext.Provider

function CartStateProvider({ children }: Props) {
  const [cartOpen, setCartOpen] = useState(false)

  function toggleCart() {
    setCartOpen(!cartOpen)
  }

  function closeCart() {
    setCartOpen(false)
  }

  function openCart() {
    setCartOpen(true)
  }

  return (
    <LocalStateProvider
      value={{
        cartOpen,
        toggleCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </LocalStateProvider>
  )
}

function useCart() {
  return useContext(LocalStateContext)
}

export { CartStateProvider, LocalStateContext, useCart }
