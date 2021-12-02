import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import rangeMap from '@lib/range-map'
import { Skeleton } from '@components/ui'
import { Marquee } from '@components/ui'
import { useProduct } from '../useProduct'

const DEFAULT_LIMIT = 4

export default function ProductList(props: {
  item: {
    dataParsed: {
      openCategoryProducts?: string,
      openProductsWidthSortPageSize?: string
    }
  }
}) {
  const { products, hasData, limit, loading } = useProduct(
    { ...props, default_limit: DEFAULT_LIMIT }
  )

  if (hasData) {
    return (
      <>
        <Marquee>
          {products.map((product: any, i: number) => (
            <ProductCard key={product.id} product={product} variant='slim' />
          ))}
        </Marquee>
      </>
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

ProductList.Layout = Layout
