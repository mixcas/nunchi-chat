import React from 'react'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import { convertFromRaw, EditorState } from 'draft-js'
import { omitBy, isNil, chunk } from 'lodash'
import { paginationSettings } from 'lib/constants'
import queryString from 'query-string'

import { transformDatabaseValueForPicker } from 'lib/datetime'

// this is where we format entry data returned from Firestore for form components
export const transformEntryValues = entry => {
  let entryTransformed = entry

  // Firestore saves Date objects as Timestamp, but the datepicker needs it as a Date object
  // If the publishDate is set, we convert it to a Date object here, and update the value on the transformed entry
  if (entry.publishDate) {
    entryTransformed = {
      ...entryTransformed,
      publishDate: transformDatabaseValueForPicker(entry.publishDate),
    }
  }
  if (entry.openingStart) {
    entryTransformed = {
      ...entryTransformed,
      openingStart: transformDatabaseValueForPicker(entry.openingStart),
    }
  }
  if (entry.openingEnd) {
    entryTransformed = {
      ...entryTransformed,
      openingEnd: transformDatabaseValueForPicker(entry.openingEnd),
    }
  }
  if (entry.closing) {
    entryTransformed = {
      ...entryTransformed,
      closing: transformDatabaseValueForPicker(entry.closing),
    }
  }
  if (entry.hours) {
    let hoursTransformed = {};
    Object.keys(entry.hours).forEach((key) => {
      hoursTransformed[key] = [
        transformDatabaseValueForPicker(entry.hours[key][0]),
        transformDatabaseValueForPicker(entry.hours[key][1])
      ]
    })
    entryTransformed = {
      ...entryTransformed,
      hours: hoursTransformed
    }
  }

  // return the transformed entry to the container
  return entryTransformed
}

// renders keywords from their array for display in the input field
export const renderCommaList = keywords => {
  if (Array.isArray(keywords)) {
    return keywords.join(', ')
  }
}

// parses keyword field input onChange to force format and array
export const parseCommaList = (keywords, allowPhrase = true) => {
  return keywords.split(', ').map(item => {
    if (allowPhrase) {
      return item
    }

    return item.trim()
  })
}

// Parse editor content from raw content
export const ParseEditorContent = (editorState)  => {

  if (editorState) {
    // Convert JSON for Editor and create with content
    const contentState = convertFromRaw(JSON.parse(editorState))

    return EditorState.createWithContent(contentState)

  } else {
    // No saved JSON. Create Editor without content
    return EditorState.createEmpty()
  }
}

// Setup empty editor state
export const emptyEditorState = JSON.stringify({
  "entityMap": {},
  "blocks": [
    {
      "key": "3l1mm",
      "text": "",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    }
  ]
})

// Clean an object from nil values
export const removeNil = dirtyObject => omitBy(dirtyObject, isNil)

export const createPagination = ( totalPages, currentPage, list ) => {
  let pages = []

  for (let p = 0; p < totalPages; p++) {
    const page = (p + 1)

    pages.push(
      <Col xs='auto' key={'events-pagination-page-' + page} style={{
        textDecoration: currentPage === p ? 'underline' : 'none'
      }}>
        <Link
          to={{
            pathname: '/' + list,
            search: '?page=' + (p + 1)
          }}
        >{page}</Link>
      </Col>
    )
  }

  return pages
}

export const createModalPagination = ( totalPages, currentPage, handlePageChange ) => {
  let pages = []

  for (let p = 0; p < totalPages; p++) {
    const page = (p + 1)

    pages.push(
      <Col xs='auto' key={'modal-pagination-page-' + page} style={{
        textDecoration: currentPage === p ? 'underline' : 'none'
      }}>
        <a href='#' onClick={() => { handlePageChange(p) }}>{page}</a>
      </Col>
    )
  }

  return pages
}

// Paginate data and return current & total pages for list view
export const listContainerPaginateProps = (state, props, data) => {
  const { perPage } = paginationSettings
  let currentPage = 0
  let docs = data
  let totalPages = 1

  if (docs) {
    if (docs.length) {
      // We have data

      docs = data.slice(0)
      // clone read-only data array for manipulation

      const docsPages = chunk(docs, perPage)
      // divide data array into child arrays by perPage
      // see: https://lodash.com/docs/4.17.11#chunk

      if (props.location.search.length > 0) {
        // "page" querystring present in url

        const query = queryString.parse(props.location.search)
        currentPage = query.page - 1
        // set currentPage to querystring value
        // -1 for array index
      }

      docs = docsPages[currentPage]
      // get data chunk and reassign docs

      totalPages = docsPages.length
      // set total pages by length of chunk array
    }
  }

  return {
    docs,
    totalPages,
    currentPage
  }
}

export const paginateModal = (state, props, data, updatePage) => {
  const { perPage } = paginationSettings
  let currentPage = updatePage ? updatePage : 0
  let docs = data
  let totalPages = 1

  if (docs) {
    if (docs.length) {
      // We have data

      docs = data.slice(0)
      // clone read-only data array for manipulation

      const docsPages = chunk(docs, perPage)
      // divide data array into child arrays by perPage
      // see: https://lodash.com/docs/4.17.11#chunk

      docs = docsPages[currentPage]
      // get data chunk and reassign docs

      totalPages = docsPages.length
      // set total pages by length of chunk array
    }
  }

  return {
    docs,
    totalPages,
    currentPage
  }
}
