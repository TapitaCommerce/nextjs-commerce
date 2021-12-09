import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next'
import commerce from '@lib/api/commerce'
import { Text } from '@components/ui'
import { Layout } from '@components/common'
import getSlug from '@lib/get-slug'
import { missingLocaleInPages } from '@lib/usage-warns'
import type { Page } from '@commerce/types/page'
import { useRouter } from 'next/router'

import ProductList from '@lib/pb/components/Product/ProductList'
import ProductGrid from '@lib/pb/components/Product/ProductGrid'
import { PageBuilderComponent } from 'simi-pagebuilder-react'
import useSWR from 'swr'
import { TAPITA_ENDPOINT } from '@lib/pb/config'
import React from 'react'
import { tapitaPageFetcher } from './api/network/tapitaPageFetcher'
import NotFound from './404'
import { comparePaths } from './api/network/comparePaths'
import { ProductScroll } from '@lib/pb/components/Product/ProductScroll'
import Category from '@lib/pb/components/Category'

export async function getStaticProps({
                                       preview,
                                       params,
                                       locale,
                                       locales
                                     }: GetStaticPropsContext<{ pages: string[] }>) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  const path = params ? params.pages.join('/') : '/'
  const slug = locale ? `${locale}/${path}` : path

  const pageItem = pages.find((p: Page) =>
    p.url ? getSlug(p.url) === slug : false
  )
  const data =
    pageItem ?
      (await commerce.getPage({
        variables: { id: pageItem.id! },
        config,
        preview
      })) : null

  const page = data ? data?.page : null

  return {
    props: { page, categories, path, noBase: !page }
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const config = { locales }
  const { pages }: { pages: Page[] } = await commerce.getAllPages({ config })
  const [invalidPaths, log] = missingLocaleInPages()
  const paths = pages
    .map((page) => page.url)
    .filter((url) => {
      if (!url || !locales) return url
      // If there are locales, only include the pages that include one of the available locales
      if (locales.includes(getSlug(url).split('/')[0])) return url

      invalidPaths.push(url)
    })
  log()

  return {
    paths,
    fallback: 'blocking'
  }
}

export default function Pages(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { pathname, route, isFallback } = useRouter()
  const { path, page, noBase = false } = props

  const { data, error } = useSWR(
    path,
    tapitaPageFetcher
  )
  const pageData = data ?
    data.data.spb_page.items.find((item: any) => comparePaths(item.url_path, path) && item.status)
    : {}

  if (error) return 'An error has occurred.'
  if (!data && !error) return <h1>Loading...</h1>

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
            pageData={pageData}
            endPoint={TAPITA_ENDPOINT}
            ProductList={ProductList}
            ProductGrid={ProductGrid}
            ProductScroll={ProductScroll}
            Category={Category}
        />
      </div>
    )
  }

  if (isFallback) {
    return <div>Loading...</div>
  }

  if (noBase) {
    return <NotFound />
  }

  if (page?.body) {
    return (
      <div className='max-w-2xl mx-8 sm:mx-auto py-20'>
        <Text html={page.body} />
      </div>
    )
  }

  return null
}

Pages.Layout = Layout
