import { GraphQlCore } from './GraphQlCore'

const pageFields = `
                        priority
                        entity_id
                        name
                        status
                        masked_id
                        custom_css
                        custom_js
                        keywords
                        title
                        desc
                        is_rtl
                        storeview_visibility
    `

const getQuery = (getPageItems: any) => {
  return `
            query getPagesByToken($integrationToken: String) {
                spb_page(integrationToken: $integrationToken) {
                    total_count
                    items {
                        url_path
                        ${pageFields}
                        ${getPageItems !== false ? 'publish_items' : ''}
                    }
                }
                catalog_builder_page(integrationToken: $integrationToken) {
                    total_count
                    items {
                        apply_to
                        ${pageFields}
                        publish_items
                    }
                }
            }
        `
}

const TapitaPageRequestBuilder = (endPoint: string, integrationToken: string): Request => {
  return GraphQlCore(getQuery, { integrationToken }, endPoint)
}
export default TapitaPageRequestBuilder
