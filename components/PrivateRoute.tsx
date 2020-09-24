import { useUser } from './User'
import Signin from './Signin'

interface Props {
  children: React.FunctionComponent
}

function PrivateRoute({ children }: Props) {
  const me = useUser()
  if (!me) return <Signin />
  return children
}

export default PrivateRoute
