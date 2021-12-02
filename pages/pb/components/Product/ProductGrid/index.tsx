import { ProductCard } from '@components/product'
import type { Product } from '@commerce/types/product'
import rangeMap from '@lib/range-map'
import { Skeleton } from '@components/ui'
import { Layout } from '@components/common'
import { useProduct } from '../useProduct'

const DEFAULT_LIMIT = 8

export default function ProductGrid(props: {
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
      <div className='col-span-12'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {products.map((product: Product) => (
            <ProductCard
              variant='simple'
              key={product.path}
              className='animated fadeIn'
              product={product}
              imgProps={{
                width: 480,
                height: 480
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
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

ProductGrid.Layout = Layout
