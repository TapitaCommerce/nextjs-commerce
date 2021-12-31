import React, { useEffect, useRef, useState } from 'react'
import FashionableDotPagination from './FashionableDotPagination'
import { getRandomString } from '../../utils/getRandomString'
// import './index.scss'
import { mergeClassStrings } from '../../utils/mergeClassStrings'
import { useCarefreeDots } from './useCarefreeDots'

let slidedTheSlider = false

export const CarefreeHorizontalScroll = (props) => {
  const { item, children, pagingStyle, _numberOfChildren, className } =
  props || {}
  const unqId = useRef(getRandomString(10)).current

  const { numberOfSteps } = useCarefreeDots({ ...props, unqId: unqId })

  const { name = 'Hello' } = item
  const numberOfChildren =
    children instanceof Array ? children.length : children ? 1 : 0

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleScroll = (index) => {
    if (currentIndex !== index) {
      setCurrentIndex(index)
    }
  }

  const isPaginationBarVisible = !!(item.dataParsed &&
  item.dataParsed.showSliderIndicator !== undefined
    ? item.dataParsed.showSliderIndicator
    : true)

  useEffect(() => {
    const index = currentIndex
    if (index === 0) {
      if (!slidedTheSlider) return
    } else slidedTheSlider = true

    if (numberOfChildren <= 1) {
      // no where to scroll
    } else if (children[index]) {
      const elements = document.querySelector(
        `.${unqId}.child-container`
      ).children
      const target = elements.item(index)
      target.scrollIntoView({ block: 'nearest', inline: 'start' })
    }
  }, [children, currentIndex, numberOfChildren, unqId])

  return (
    <React.Fragment>
      <div className={mergeClassStrings('carefree-container', className)}>
        <div className={'inner-container'}>
          <div className={'title'}>{name}</div>
          <div className={`${unqId} child-container`}>{children}</div>
        </div>
        {isPaginationBarVisible && (
          <FashionableDotPagination
            pagingStyle={pagingStyle}
            numberOfPages={numberOfSteps}
            currentIndex={currentIndex}
            onChangeIndex={handleScroll}
          />
        )}
      </div>
    </React.Fragment>
  )
}

export default CarefreeHorizontalScroll