import { useMutation, gql } from '@apollo/client'
import { CURRENT_USER_QUERY } from './User'

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`

function Signout() {
  const [signout, { data }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })
  return (
    <button
      type="button"
      onClick={async () => {
        console.log('signing out!')
        const { data } = await signout()
        console.log(data.signout.message)
      }}
    >
      Sign Out
    </button>
  )
}
export default Signout
