import { gql } from '@apollo/client'
import styled from 'styled-components'
import Head from 'next/head'
import { GetItem } from './__generated__/GetItem'

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${(props) => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`

const SINGLE_ITEM_QUERY = gql`
  query GetItem($id: ID!) {
    item(id: $id) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`

function SingleItem({ item }: GetItem) {
  if (!item) return null
  return (
    <SingleItemStyles>
      <Head>
        <title>Wanderlost | {item.title}</title>
      </Head>
      <img src={item.largeImage as string} alt={item.title} />
      <div className="details">
        <h2>Viewing {item.title}</h2>
        <p>{item.description}</p>
      </div>
    </SingleItemStyles>
  )
}

export default SingleItem
export { SINGLE_ITEM_QUERY }
