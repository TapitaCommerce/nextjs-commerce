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

const Category = (props) => {
  //currently cannot fetch
  return null
}
export default Category
