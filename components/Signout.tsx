import { useMutation, gql } from '@apollo/client'
import { CURRENT_USER_QUERY } from './User'
import { Signout as SignoutTypes } from './__generated__/Signout'

const SIGN_OUT_MUTATION = gql`
  mutation Signout {
    signout {
      message
    }
  }
`

function Signout() {
  const [signout, { data }] = useMutation<SignoutTypes>(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })
  return (
    <button type="button" onClick={async () => signout()}>
      Sign Out
    </button>
  )
}
export default Signout
