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
        <div
            style={{
                fontFamily: `"Poppins", Helvetica, Arial, sans-serif`,
                fontSize: '14px',
                lineHeight: 1.5
            }}
        >
            <style>
                @import
                url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            </style>
            <PageBuilderComponent
                key={maskId}
                endPoint={TAPITA_ENDPOINT}
                pageData={pageData}
                ProductList={ProductList}
                ProductGrid={ProductGrid}
                ProductScroll={ProductScroll}
                Category={Category}
            />
      </div>
    )
  }

  return null
}

Home.Layout = Layout
