import useSearch from '@framework/product/use-search'
import { useRouter } from 'next/router'
import { ProductCard } from '@components/product'
import type { Product } from '@commerce/types/product'
import rangeMap from '@lib/range-map'
import {  Skeleton } from '@components/ui'
import { Layout } from '@components/common'

export default function  ProductGrid (props: any) {
    const {
        item,
    } = props;
    const items = JSON.stringify(item);

  const router = useRouter()
  const { asPath, locale } = router

    const { data } = useSearch({
        search:  'vans',         
        locale,
      })    
    return (
        <div className="col-span-12">            
            {data ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {data.products.map((product: Product) => (
                  <ProductCard
                    variant="simple"
                    key={product.path}
                    className="animated fadeIn"
                    product={product}
                    imgProps={{
                      width: 480,
                      height: 480,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {rangeMap(12, (i) => (
                  <Skeleton key={i}>
                    <div className="w-60 h-60" />
                  </Skeleton>
                ))}
              </div>
            )}{' '}            
        </div>
    )
}

ProductGrid.Layout = Layout
//export default ProductList;