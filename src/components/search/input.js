import React from 'react'
import debounce from 'lodash.debounce'
import { connectSearchBox } from 'react-instantsearch-dom'

export default connectSearchBox(({ refine, setFocus, ...rest }) => {
  const debouncedSearch = debounce(e => refine(e.target.value), 500)

  return (
    <input
      type="text"
      placeholder="Search"
      aria-label="Search"
      onChange={e => {
        e.persist()
        if (e.target.value === '') return
        debouncedSearch(e)
      }}
      {...rest}
    />
  )
})
