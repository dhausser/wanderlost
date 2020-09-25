import { useRouter } from 'next/router'
import Reset from '../components/Reset'

const ResetPage = () => {
  const router = useRouter()
  const { resetToken } = router.query

  return (
    <>
      <p>Reset your password</p>
      <Reset resetToken={resetToken as string} />
    </>
  )
}

export default ResetPage
