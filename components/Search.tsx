import Downshift, { resetIdCounter } from 'downshift'
import { useRouter } from 'next/router'
import { useLazyQuery, gql } from '@apollo/client'

import debounce from 'lodash.debounce'
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown'

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEM_QUERY($searchTerm: String!) {
    allItems(searchTerm: $searchTerm) {
      id
      image
      title
    }
  }
`

function routeToItem(item) {
  const router = useRouter()
  router.push({
    pathname: '/item',
    query: {
      id: item.id,
    },
  })
}

function Autocomplete() {
  const [findItems, { loading, data }] = useLazyQuery(SEARCH_ITEMS_QUERY)
  const items = data ? data.allItems : []
  const findItemsButChill = debounce(findItems, 350)
  resetIdCounter()
  return (
    <SearchStyles>
      <Downshift onChange={routeToItem} itemToString={(item) => (item === null ? '' : item.title)}>
        {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
          <div>
            <input
              {...getInputProps({
                type: 'search',
                placeholder: 'Search For An Item',
                id: 'search',
                className: loading ? 'loading' : '',
                onChange: (e) => {
                  e.persist()
                  findItemsButChill({
                    variables: { searchTerm: e.target.value },
                  })
                  console.log(data)
                },
              })}
            />

            {isOpen && (
              <DropDown>
                {items.map((item, index) => (
                  <DropDownItem
                    {...getItemProps({ item })}
                    key={item.id}
                    highlighted={index === highlightedIndex}
                  >
                    <img width="50" src={item.image} alt={item.title} />
                    {item.title}
                  </DropDownItem>
                ))}
                {!items.length && !loading && (
                  <DropDownItem highlighted={false}>Nothing Found {inputValue}</DropDownItem>
                )}
              </DropDown>
            )}
          </div>
        )}
      </Downshift>
    </SearchStyles>
  )
}

export default Autocomplete
