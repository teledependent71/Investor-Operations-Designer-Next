import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/thq-react-components'
import PropTypes from 'prop-types'

import authorsPageInitialPathsA766bResource from '../../../resources/authors-page-initial-paths-a766b'
import authorsPageInitialPropsA8721Resource from '../../../resources/authors-page-initial-props-a8721'

const Authors1 = (props) => {
  return (
    <>
      <div className="authors1-container">
        <Head>
          <title>Authors - Investor Operations Designer</title>
          <meta
            property="og:title"
            content="Authors - Investor Operations Designer"
          />
        </Head>
        <DataProvider
          renderSuccess={(params) => (
            <>
              <Repeater
                items={params}
                renderItem={(AuthorsEntities) => (
                  <>
                    <div className="authors1-container1">
                      <h1>{AuthorsEntities?.name}</h1>
                      <span>{AuthorsEntities?.name}</span>
                      <span>{AuthorsEntities?.id}</span>
                    </div>
                  </>
                )}
              />
            </>
          )}
          initialData={props.authorsEntities}
          persistDataDuringLoading={true}
          key={props.page}
        />
      </div>
      <style jsx>
        {`
          .authors1-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .authors1-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

Authors1.defaultProps = {
  authorsEntities: [],
}

Authors1.propTypes = {
  authorsEntities: PropTypes.array,
}

export default Authors1

export async function getStaticPaths() {
  const response = await authorsPageInitialPathsA766bResource({})
  const totalCount = response?.meta?.pagination?.total
  const pagesCount = Math.ceil(totalCount / 10)
  return {
    paths: Array.from(
      {
        length: pagesCount,
      },
      (_, i) => ({
        params: {
          page: (i + 1).toString(),
        },
      })
    ),
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const response = await authorsPageInitialPropsA8721Resource({
    ...context?.params,
    start: (context.params.page - 1) * 10,
  })
  return {
    props: {
      authorsEntities: response?.data,
      ...response?.meta?.pagination,
    },
    revalidate: 60,
  }
}
