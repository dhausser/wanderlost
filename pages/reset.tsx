import Reset from '../components/Reset'

const ResetPage = ({ query }) => (
  <>
    <p>Reset your password</p>
    <Reset resetToken={query.resetToken} />
  </>
)

export default ResetPage
