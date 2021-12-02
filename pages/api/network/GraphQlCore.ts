export const GraphQlCore = (
  getQuery: (args0: any) => string,
  variables = {},
  endPoint: string,
  operationName = 'getPbPage',
  extraHeader = {}
) => {
  const header = { cache: 'default', mode: 'cors', ...extraHeader }
  const requestData: any = {}
  requestData.method = 'GET'
  requestData.headers = header
  // requestData.credentials = 'same-origin'
  const getData: any = {
    query: getQuery(true),
    variables: JSON.stringify(variables),
    operationName: operationName
  }
  let requestEndPoint = endPoint
  let dataGetString: any = Object.keys(getData).map(function(key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(getData[key])
  })
  dataGetString = dataGetString.join('&')
  if (dataGetString) {
    if (requestEndPoint.includes('?')) {
      requestEndPoint += '&' + dataGetString
    } else {
      requestEndPoint += '?' + dataGetString
    }
  }
  return new Request(requestEndPoint, requestData)
}
