import { gql } from '@apollo/client';
export const CollectionFragment = gql`
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
`;

export const GET_COLLECTION_DETAILS = gql`
    query getCollectionDetails {
        collections(first: 250) {
            edges {
                cursor
                node {
                    ...CollectionFragment
                }
            }
        }
    }
    ${CollectionFragment}
`;