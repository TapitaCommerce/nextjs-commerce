import usePrice from '@framework/product/use-price'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { Button, Text } from '@components/ui'
import { Bag, Cross, Check, MapPin, CreditCard } from '@components/icons'
import useSearch from '@framework/product/use-search'
import { useRouter } from 'next/router'
import { ProductCard } from '@components/product'
import type { Product } from '@commerce/types/product'
import rangeMap from '@lib/range-map'
import {  Skeleton } from '@components/ui'
import { Grid, Marquee, Hero } from '@components/ui'

export default function  ProductList (props: any) {
    const {
        item,
    } = props;
    const items = JSON.stringify(item);

  const router = useRouter()
  const { asPath, locale } = router

    const { data } = useSearch({
        search:  'shoes',         
        locale,
      })    
    return (
        <>            
            {data ? (
                <Marquee>
                {data.products.slice(4).map((product: any, i: number) => (
                  <ProductCard key={product.id} product={product} variant="slim" />
                ))}
              </Marquee>
            ) : (
                <div className="flex flex-row">
                        {rangeMap(4, (i) => (
                        <Skeleton key={i}>
                        <div className="w-60 h-60" />
                        </Skeleton>
                    ))}
                </div>
            )}{' '}            
        </>
    )
}
//export default ProductList;