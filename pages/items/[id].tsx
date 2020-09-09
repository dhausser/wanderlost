import { PrismaClient } from '@prisma/client'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { initializeApollo } from '../../apollo/client'
import SingleItem, { SINGLE_ITEM_QUERY } from '../../components/SingleItem'

function Item({ id }) {
  return <SingleItem id={id} />
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
  const apolloClient: ApolloClient<NormalizedCacheObject | null> = initializeApollo()

  await apolloClient.query({
    query: SINGLE_ITEM_QUERY,
    variables: { id: params.id },
  })

  return {
    props: {
      id: params.id,
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Item
