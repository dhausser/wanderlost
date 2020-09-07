import { useUser } from './User'
import Signin from './Signin'

function PrivateRoute({ children }) {
  const me = useUser()
  if (!me) return <Signin />
  return children
}

export default PrivateRoute
