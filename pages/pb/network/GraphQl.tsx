/**
 *
 * @param {string} endPoint
 * @param {function} callBack
 * @param {string} queryContent
 * @param {Object} variables
 * @param operationName
 */

 export function createRequest() {
    const endPoint = 'https://tapita.io/pb/graphql/';
    const integrationToken = '17nMVmUJAxdditfSvAqBqoC6VJKTKpD21626949895';
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
    `;
    const getQuery = (getPageItems : any) => {
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
        `;
    };


	const header = { cache: 'default', mode: 'cors' };
	const requestData: any = {};
	requestData.method = 'GET';
	requestData.headers = header;
	requestData.credentials = 'same-origin';
	const getData : any = {
		query: getQuery(true),
		variables: JSON.stringify({ integrationToken }),
		operationName: 'getPbPage',
	};
	let requestEndPoint = endPoint;
	let dataGetString : any = Object.keys(getData).map(function (key) {
		return encodeURIComponent(key) + '=' + encodeURIComponent(getData[key]);
	});
	dataGetString = dataGetString.join('&');
	if (dataGetString) {
		if (requestEndPoint.includes('?')) {
			requestEndPoint += '&' + dataGetString;
		} else {
			requestEndPoint += '?' + dataGetString;
		}
	}    
	let _request = new Request(requestEndPoint, requestData);
	return _request;
}