import { useState } from "react";
import { View, Image, MovableArea, MovableView } from "@tarojs/components";
import debounce from 'lodash.debounce'
import MenuIcon from './menu.svg'

import './index.scss'


export default function SortableList({
  data = [],
  onSort = () => {},
  itemHeight = 60,
  itemGap = 12,
  itemClassName = ""

}) {
  const initData = data.map((i, idx) => ({
    ...i,
    id: idx,
    y: idx * itemHeight + itemGap * 2,
  }));

  const [position, setPosition] = useState([-1, 0]); // idx, y
  const [elements, setElements] = useState(initData);
  const [changeEnd, setChangeEnd] = useState(false)
  const [sameOrder, setSameOrder] = useState(false)

  const callOnSort = (x) => { onSort(x) }
  const debouncedOnSort = debounce(
    callOnSort,
    500,
    { leading: true, trailing: false }
  )

  const onPositionChange = (e, idx) => {
    if (changeEnd) {
      debouncedOnSort(elements)
      return
    }

    const { y } = e.detail
    setPosition([idx, y])
  }

  const onChangeEnd = (e, idx) => {
    const newElements = elements
      .map((i, idx) => {
        if (idx === position[0]) {
          return {
            ...i,
            y: position[1]
          }
        }
        return i
      })
      .sort((a, b) => a.y - b.y)
      .map((i, idx) => ({
        ...i,
        id: i.id,
        y: idx * itemHeight + itemGap
      }))

    setPosition([-1, 0])
    setChangeEnd(true)

    if (JSON.stringify(newElements) === JSON.stringify(elements)) {
      setSameOrder(!sameOrder)
    } else {
      setElements(newElements)
    }

    setTimeout(() => {
      setChangeEnd(false)
    }, 500)
  }

  return (
    <View className='pl32 pr32' style={{ paddingBottom: 50 }}>
      <MovableArea className='w100' style={{ height: elements.length * itemHeight + (itemGap * 4)}}>
        {
          sameOrder
            ? elements.map((i, idx) => {
              let cn = ''
              let inlineStyle = ''
              if (idx === position[0]) {
                cn = 'sortable-focus-item'
              } else if (position[1] !== 0 && idx > position[0] && position[1] > i.y) {
                cn = 'sortable-focus-upper'
                inlineStyle = `transform: translateY(-${itemHeight}px)`
              } else if (position[1] !== 0 && idx < position[0] && position[1] < i.y) {
                cn = 'sortable-focus-lower'
                inlineStyle = `transform: translateY(${itemHeight}px)`
              } else {
                cn = 'sortable-focus-current'
              }

              return (
                <MovableView
                  key={-i.id}
                  direction='vertical'
                  className={`w100 ${cn}`}
                  style={{ height: itemHeight - itemGap }}
                  y={i.y}
                  outOfBounds
                  onChange={(e) => onPositionChange(e, idx)}
                  onTouchEnd={(e) => onChangeEnd(e, idx)}
                  onTouchStart={() => { setPosition([idx, i.y]) }}
                >
                  <View className={`sortable-test ${itemClassName}`} style={inlineStyle}>
                    <View className='' >{i.text}</View>
                    <Image src={MenuIcon} className='sortable-menu-icon' />
                  </View>
                </MovableView>
              )
            })
            : elements.map((i, idx) => {
              let cn = ''
              let inlineStyle = ''
              if (idx === position[0]) {
                cn = 'sortable-focus-item'
              } else if (position[1] !== 0 && idx > position[0] && position[1] > i.y) {
                cn = 'sortable-focus-upper'
                inlineStyle = `transform: translateY(-${itemHeight}px)`
              } else if (position[1] !== 0 && idx < position[0] && position[1] < i.y) {
                cn = 'sortable-focus-lower'
                inlineStyle = `transform: translateY(${itemHeight}px)`
              } else {
                cn = 'sortable-focus-current'
              }

              return (
                <MovableView
                  key={i.id}
                  direction='vertical'
                  className={`w100 ${cn}`}
                  style={{ height: itemHeight - itemGap }}
                  y={i.y}
                  outOfBounds
                  onChange={(e) => onPositionChange(e, idx)}
                  onTouchEnd={(e) => onChangeEnd(e, idx)}
                  onTouchStart={() => { setPosition([idx, i.y]) }}
                >
                  <View className='sortable-test' style={inlineStyle}>
                    <View className=''>{i.text}</View>
                    <Image src={MenuIcon} className='sortable-menu-icon' />
                  </View>
                </MovableView>
              )
            })
        }
      </MovableArea>
    </View>
  );
}
