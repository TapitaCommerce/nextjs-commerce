import { useRouter } from 'next/router'
import useSearch from '@framework/product/use-search'

const DEFAULT_DEFAULT_LIMIT = 8
export const useProduct = (props: {
  item: {
    dataParsed: {
      openCategoryProducts?: string,
      openProductsWidthSortPageSize?: string
    }
  },
  default_limit?: number
}) => {

  const {
    item,
    default_limit = DEFAULT_DEFAULT_LIMIT
  } = props
  const { locale } = useRouter()

  const categoryHandler = item && item.dataParsed ?
    item.dataParsed.openCategoryProducts : undefined

  const { data, isLoading, error } = useSearch({
    search: categoryHandler,
    locale
    // sort: 'price-asc' // TODO: mapping later
  })

  //  cannot find individual product
  // fallback to full products
  const canRenderWithHandler = !!categoryHandler

  const limit = item && item.dataParsed ?
    Number.parseInt(
      item.dataParsed.openProductsWidthSortPageSize
      || String(default_limit)
    )
    : default_limit

  const hasData = !!data

  const products = data ? data.products.slice(0, limit) : []

  return {
    hasData,
    products,
    loading: isLoading,
    error,
    canRenderWithHandler,
    limit,
    categoryHandler,
    item
  }
}
