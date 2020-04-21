import { PrismaClient } from '@prisma/client'
import StaticItem from '../../components/StaticItem'

function Item({ item }) {
  return <StaticItem item={item} />
}

export async function getStaticPaths() {
  const prisma = new PrismaClient()
  const items = await prisma.item.findMany()

  const paths = items.map(item => `items/${item.id}`)

  // return { paths, fallback: false }
  return {
    paths: items.map(item => ({
      params: {
        id: item.id
      }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const prisma = new PrismaClient()
  const item = await prisma.item.findOne({
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      image: true,
      largeImage: true
    },
    where: { id: params.id }
  })

  return {
    props: {
      item
    }
  }
}

export default Item
