import React, { useState } from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer, gql } from '@apollo/client';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

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
`;

function routeToItem(item) {
  Router.push({
    pathname: '/item',
    query: {
      id: item.id,
    },
  });
}

export default function Autocomplete() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const onChange = debounce(async (e, client) => {
    console.log('Searching...');
    // Turn loading on
    setLoading(true);
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_ITEM_QUERY,
      variables: { searchTerm: e.target.value },
    });
    setItems(res.data.items);
    setLoading(false);
  }, 350);

  resetIdCounter();

  return (
    <SearchStyles>
      <Downshift
        onChange={routeToItem}
        itemToString={(item) => (item === null ? '' : item.title)}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex,
        }) => (
          <div>
            <ApolloConsumer>
              {(client) => (
                <input
                  {...getInputProps({
                    type: 'search',
                    placeholder: 'Search For An Item',
                    id: 'search',
                    className: loading ? 'loading' : '',
                    onChange: (e) => {
                      e.persist();
                      onChange(e, client);
                    },
                  })}
                />
              )}
            </ApolloConsumer>
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
                  <DropDownItem>Nothing Found {inputValue}</DropDownItem>
                )}
              </DropDown>
            )}
          </div>
        )}
      </Downshift>
    </SearchStyles>
  );
}
