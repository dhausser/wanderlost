import { useRouter } from 'next/router'
import SingleItem from '../components/StaticItem'

const Item = () => {
  const { query } = useRouter()
  return (
    <SingleItem id={query.id} />
  )
}

export default Item
