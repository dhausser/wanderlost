import { useRouter } from 'next/router'
import UpdateItem from '../components/UpdateItem'

const Sell = () => {
  const { query } = useRouter()
  return <UpdateItem id={query.id as string} />
}

export default Sell
