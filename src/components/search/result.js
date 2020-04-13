import React from 'react'
import { Highlight } from 'react-instantsearch-dom'
import { Link } from 'gatsby'

export const PostHit = clickHandler => ({ hit }) => {
  return (
    <div>
      <Link to={hit.fields.slug} onClick={clickHandler}>
        <span>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </span>
      </Link>
      <div>
        <Highlight attribute="date" hit={hit} tagName="mark" />
      </div>
    </div>
  )
}
