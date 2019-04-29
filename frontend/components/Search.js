import React, { useState } from 'react'
import Downshift from 'downshift'
import Router from 'next/router'
import { ApolloConsumer } from 'react-apollo'
import { gql } from 'apollo-boost'
import debounce from 'lodash.debounce'
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown'

const SEARCH_ITEM_QUERY = gql`
  query SEARCH_ITEM_QUERY($searchTerm: String!) {
    items(
      where: {
        OR: [{ title_contains: $searchTerm }, { description: $searchTerm }]
      }
    ) {
      id
      image
      title
    }
  }
`

export default function Autocomplete() {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])

  const onChange = debounce(async (e, client) => {
    console.log('Searching...')
    // Turn loading on
    setLoading(true)
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_ITEM_QUERY,
      variables: { searchTerm: e.target.value },
    })
    setItems(res.data.items)
    setLoading(false)
  }, 350)

  return (
    <SearchStyles>
      <div>
        <ApolloConsumer>
          {client => (
            <input
              type="search"
              onChange={e => {
                e.persist()
                onChange(e, client)
              }}
            />
          )}
        </ApolloConsumer>
        <DropDown>
          {items.map(item => (
            <DropDownItem>
              <img width="50" src={item.image} alt={item.title} />
              {item.title}
            </DropDownItem>
          ))}
        </DropDown>
      </div>
    </SearchStyles>
  )
}
