import React from 'react'
import { Layout } from '@components/common'
import type { GetStaticPropsContext } from 'next'

import ProductList from './pb/components/Product/ProductList'
import ProductGrid from './pb/components/Product/ProductGrid'
import { PageBuilderComponent } from 'simi-pagebuilder-react'
import useSWR from 'swr'
import { TAPITA_ENDPOINT, TAPITA_INTEGRATION_TOKEN } from './pb/config'
import { InferGetStaticPropsType } from 'next'
import { tapitaPageFetcher } from './api/network/tapitaPageFetcher'
import { comparePaths } from './api/network/comparePaths'
import { ProductScroll } from './pb/components/Product/ProductScroll'
import Category from './pb/components/Category'

export async function getStaticProps({
                                       locale,
                                       locales,
                                       params
                                     }: GetStaticPropsContext<{ pages: string[] }>) {

  const config = { locale, locales }
  const path = params ? params.pages.join('/') : '/'

  return {
    props: {
      config,
      path
    }
  }
}

export default function Home(props: InferGetStaticPropsType<typeof getStaticProps>): any {
  const { path } = props
  const { data, error } = useSWR(
    path,
    tapitaPageFetcher
  )
  const pageData = data ?
    data.data.spb_page.items.find((item: any) => comparePaths(item.url_path, path) && item.status)
    : {}

  if (error) return 'An error has occurred.'
  if (!data) return <h1>Loading...</h1>


  if (pageData) {
    const maskId: string = pageData.masked_id

    return (
      <PageBuilderComponent
        key={maskId}
        endPoint={TAPITA_ENDPOINT}
        pageData={pageData}
        ProductList={ProductList}
        ProductGrid={ProductGrid}
        ProductScroll={ProductScroll}
        Category={Category}
      />
    )
  }

  return null
}

Home.Layout = Layout
