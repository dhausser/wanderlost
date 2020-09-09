import { PrismaClient } from '@prisma/client'
import StaticItem from '../../components/StaticItem'

function Item({ item }) {
  return <StaticItem item={item} />
}

export async function getStaticPaths() {
  const prisma = new PrismaClient()
  const items = await prisma.item.findMany()

  return {
    paths: items.map((item) => ({
      params: {
        id: item.id,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const prisma = new PrismaClient()
  const item = await prisma.item.findOne({
    where: { id: params.id },
    select: {
      id: true,
      title: true,
      description: true,
      image: true,
      largeImage: true,
      price: true,
    },
  })

  return {
    props: {
      item,
    },
  }
}

export default Item
