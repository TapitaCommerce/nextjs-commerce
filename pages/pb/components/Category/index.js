import React from 'react'
import useSWR from 'swr'
import { tapitaCategoryFetcher } from '../../../api/network/tapitaCategoryFetcher'

export const recursiveFindCate = (cateArr, idToFind) => {
  let foundCate
  cateArr.every(cateArrItm => {
    if (cateArrItm.node.handle === idToFind) foundCate = cateArrItm
    if (foundCate) return false
    else return true
  })
  return foundCate
}

const imageStyle = {
  display: 'block',
  margin: '10px auto',
  width: '100%'
}


const Category = (props) => {
  return null
  const { item } = props
  // const { formatMessage } = useIntl();
  // const { data } = useQuery(GET_COLLECTION_DETAILS, {
  //   fetchPolicy: 'cache-first'
  // })
  const { data, error } = useSWR(
    '/',
    tapitaCategoryFetcher
  )

  return <h1>{JSON.stringify(data)}</h1>

  if (
    item &&
    item.dataParsed &&
    item.dataParsed.openCategoryProducts &&
    data
  ) {
    const { dataParsed } = item
    const collectionData = data.collections.edges
    const idToFind = dataParsed.openCategoryProducts
    const foundCate = recursiveFindCate(collectionData, idToFind)

    if (foundCate) {
      return (
        <link
          href={'/collections/' + foundCate.node.handle}
          style={{ width: '100%' }}
        >
          {dataParsed.image ? (
            <img
              src={dataParsed.image}
              alt={foundCate.node.title}
              style={imageStyle}
            />
          ) : (
            ''
          )}
          <div className='cate_name'>
            {foundCate.node.title}
          </div>
        </link>
      )
    }
  }
  return ''
}
export default Category
