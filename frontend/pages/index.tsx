import { PrismaClient } from '@prisma/client'
// import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
// import Items from '../components/Items'
import StaticItems from '../components/StaticItems'
// import { PAGINATION_QUERY } from '../components/Pagination'

function IndexPage({ items }) {
  const router = useRouter()
  const { page } = router.query
  // const { loading, error, data } = useQuery(PAGINATION_QUERY)
  // if (loading) return 'Loading...';
  // if (error) return error.message;
  return (
    <StaticItems
      items={items}
      page={parseFloat(page as string) || 1}
    // count={data.items.total}
    />
    // <Items
    //   page={parseFloat(query.page as string) || 1}
    //   count={data.items.total}
    // />
  )
};

export async function getStaticProps() {
  const prisma = new PrismaClient()
  const items = await prisma.item.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      image: true,
      largeImage: true
    }
  })

  return {
    props: {
      items
    }
  }
}

export default IndexPage