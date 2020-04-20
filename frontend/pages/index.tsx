import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Items from '../components/Items'
import { PAGINATION_QUERY } from '../components/Pagination'

function IndexPage() {
  const { query } = useRouter()
  const { loading, error, data } = useQuery(PAGINATION_QUERY)
  if (loading) return 'Loading...';
  if (error) return error.message;
  return (
    <Items
      page={parseFloat(query.page as string) || 1}
      count={data.items.total}
    />
  )
};

export default IndexPage