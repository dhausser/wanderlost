import { PrismaClient } from '@prisma/client'
import { useRouter } from 'next/router'
import Items from '../components/Items'

function IndexPage({ items }) {
  const router = useRouter()
  const { page } = router.query

  return (
    <Items page={parseFloat(page as string) || 1} />
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