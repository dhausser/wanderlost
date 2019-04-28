import { useQuery } from 'react-apollo-hooks'
import { CURRENT_USER_QUERY } from './User'
import Signin from './Signin'

export default function PleaseSignIn(props) {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY)
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error: {error.message}</p>
  }
  if (!data.me) {
    return (
      <div className="">
        <p>Please Sign In before continuing</p>
        <Signin />
      </div>
    )
  }
  return props.children
}
