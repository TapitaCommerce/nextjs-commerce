import { GraphQlCore } from './GraphQlCore'

const CollectionFragment = `
    fragment CollectionFragment on Collection {
        id
        image {
            altText
            width
            height
            id
            originalSrc
            transformedSrc
        }
        title
        updatedAt
        descriptionHtml
        handle
    }
`

const GET_COLLECTION_DETAILS = `
    query getCollectionDetails {
        collections(first: 250) {
            edges {
                cursor
                node {
                    ${CollectionFragment}
                }
            }
        }
    }
`

const getQuery = () => GET_COLLECTION_DETAILS

const endPoint = process.env.NEXT_PUBLIC_TAPITA_ENDPOINT || ''
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || ''

const TapitaCategoryQueryBuilder = (): Request => {
  return GraphQlCore(
    getQuery,
    {},
    endPoint,
    'getCollectionDetails',
    { 'x-shopify-storefront-access-token': token }
  )
}
export default TapitaCategoryQueryBuilder
