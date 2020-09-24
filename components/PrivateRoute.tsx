import { useUser } from './User'
import Signin from './Signin'

interface Props {
  children: JSX.Element
}

function PrivateRoute({ children }: Props) {
  const me = useUser()
  if (!me) return <Signin />
  return children
}

export default PrivateRoute
