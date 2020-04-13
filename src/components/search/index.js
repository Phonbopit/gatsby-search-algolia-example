import React, { useState, useEffect, createRef, useMemo } from 'react'
import {
  InstantSearch,
  Index,
  Configure,
  Hits,
  connectStateResults,
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'

import Input from './Input'
import { PostHit } from './result'

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0 ? children : `No results for '${state.query}'`
)

const useClickOutside = (ref, handler, events) => {
  if (!events) events = [`mousedown`, `touchstart`]
  const detectClickOutside = event => {
    if (!ref.current) return
    !ref.current.contains(event.target) && handler()
  }
  useEffect(() => {
    for (const event of events)
      document.addEventListener(event, detectClickOutside)
    return () => {
      for (const event of events)
        document.removeEventListener(event, detectClickOutside)
    }
  })
}

export default function Search({ indices, collapse, hitsAsGrid }) {
  const ref = createRef()

  const [, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)

  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )

  useClickOutside(ref, () => setFocus(false))

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
      root={{ props: { ref } }}
    >
      <Configure distinct />
      <Input
        onFocus={() => setFocus(true)}
        {...{ collapse, focus, setFocus }}
      />

      <div className="search-content">
        {indices.map(({ name, title }) => (
          <Index key={name} indexName={name}>
            <header>
              <h3 className="search-title">{title}</h3>
            </header>
            <Results>
              <Hits hitComponent={PostHit(() => setFocus(false))} />
            </Results>
          </Index>
        ))}
      </div>
    </InstantSearch>
  )
}
