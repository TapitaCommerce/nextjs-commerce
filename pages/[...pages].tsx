import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import commerce from '@lib/api/commerce'
import { Text } from '@components/ui'
import { Layout } from '@components/common'
import getSlug from '@lib/get-slug'
import { missingLocaleInPages } from '@lib/usage-warns'
import type { Page } from '@commerce/types/page'
import { useRouter } from 'next/router'

import ProductList from './pb/components/ProductList';
import ProductGrid from './pb/components/ProductGrid';
import { createRequest } from './pb/network/GraphQl';

declare var x: any;
var x = require('simi-pagebuilder-react')
const { PageBuilderComponent, usePbFinder }= x


export async function getStaticProps({
  preview,
  params,
  locale,
  locales,
}: GetStaticPropsContext<{ pages: string[] }>) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  const path = params?.pages.join('/')
  const slug = locale ? `${locale}/${path}` : path
  
  //Builder 
  let query = createRequest();
  const res = await fetch(query)
  const dataPb = await res.json()  
  let cmsPb = {masked_id: null};
  if(dataPb) {    
    const pbData = dataPb.data.spb_page.items;        
    pbData.forEach((item: any) => {
      if(item.url_path == "/"+path && item.status){
        cmsPb = item;
        return;
      }
    });
    if(cmsPb.masked_id){
      let page = {body: ''};
      return {
        props: { pages, page, cmsPb, categories },
        revalidate: 60 * 60, // Every hour
      }
    }
  }  

  const pageItem = pages.find((p: Page) =>
    p.url ? getSlug(p.url) === slug : false
  )
  const data =
    pageItem &&
    (await commerce.getPage({
      variables: { id: pageItem.id! },
      config,
      preview,
    }))

  const page = data?.page

  if (!page) {
    // We throw to make sure this fails at build time as this is never expected to happen
    throw new Error(`Page with slug '${slug}' not found`)
  }

  
  return {
    props: { pages, page, cmsPb, categories },
    revalidate: 60 * 60, // Every hour
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
    fallback: 'blocking',
  }
}

export default function Pages({
  page, cmsPb
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  if (cmsPb && cmsPb.masked_id) {        
    return (
        <PageBuilderComponent key={cmsPb.masked_id} pageData={cmsPb} ProductList={ProductList}  ProductGrid={ProductGrid}/>
    )      
  }
  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <div className="max-w-2xl mx-8 sm:mx-auto py-20">
      {page?.body && <Text html={page.body} />}
    </div>
  )
}

Pages.Layout = Layout