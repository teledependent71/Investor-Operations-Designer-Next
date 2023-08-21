import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/thq-react-components'
import Markdown from 'markdown-to-jsx'
import PropTypes from 'prop-types'

import booksPageInitialPaths6c9a6Resource from '../../resources/books-page-initial-paths-6c9a6'
import booksPageInitialProps7c49dResource from '../../resources/books-page-initial-props-7c49d'

const Books11 = (props) => {
  return (
    <>
      <div className="books11-container">
        <Head>
          <title>Books1 - Investor Operations Designer</title>
          <meta
            property="og:title"
            content="Books1 - Investor Operations Designer"
          />
        </Head>
        <DataProvider
          renderSuccess={(BooksEntity) => (
            <>
              <div className="books11-container1">
                <h1>{BooksEntity?.title}</h1>
                <span>{BooksEntity?.price}</span>
                <span>{BooksEntity?.Description}</span>
                <div className="books11-container2">
                  <Markdown>{BooksEntity?.Content}</Markdown>
                </div>
              </div>
            </>
          )}
          initialData={props.booksEntity}
          persistDataDuringLoading={true}
          key={props.page}
        />
      </div>
      <style jsx>
        {`
          .books11-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .books11-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .books11-container2 {
            width: 100%;
            align-self: stretch;
          }
        `}
      </style>
    </>
  )
}

Books11.defaultProps = {
  booksEntity: [],
}

Books11.propTypes = {
  booksEntity: PropTypes.array,
}

export default Books11

export async function getStaticPaths() {
  const response = await booksPageInitialPaths6c9a6Resource({})
  return {
    paths: (response?.data || []).map((item) => {
      return {
        params: {
          id: (item?.id).toString(),
        },
      }
    }),
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const response = await booksPageInitialProps7c49dResource({
    ...context?.params,
  })
  return {
    props: {
      booksEntity: response?.data?.[0],
      ...response?.meta?.pagination,
    },
    revalidate: 60,
  }
}
