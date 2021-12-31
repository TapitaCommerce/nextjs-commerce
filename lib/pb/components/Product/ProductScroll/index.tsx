import { useProduct } from '../useProduct'
import { ProductCard } from '@components/product'
import { CarefreeHorizontalScroll } from '../../PaginationScroll/CarefreeHorizontalScroll'
import rangeMap from '@lib/range-map'
import { Skeleton } from '@components/ui'

const DEFAULT_LIMIT = 8

export const ProductScroll = (props: {
  item: {
    dataParsed: {
      openCategoryProducts?: string,
      openProductsWidthSortPageSize?: string
    }
  }
}) => {
  const { products: _products, hasData, item, loading, limit } = useProduct(
    { ...props, default_limit: DEFAULT_LIMIT }
  )

  if (hasData) {
    const products = _products.map((product: any, i: number) => (
      <ProductCard key={product.id} product={product} variant='slim' />
    ))


    return (
      <CarefreeHorizontalScroll item={item} className={'prd-scroll-ctn'}>
        {products}
      </CarefreeHorizontalScroll>
    )
  }

  if (loading) {
    return (
      <div className='flex flex-row'>
        {rangeMap(limit, (i) => (
          <Skeleton key={i}>
            <div className='w-60 h-60' />
          </Skeleton>
        ))}
      </div>
    )
  }

  return null
}

export default ProductScroll