# 
```
import SortableList from '../../components/SortableList/index'

const data = [
  { id: 1, text: '小游戏'},
  { id: 2, text: '婚恋'},
  { id: 3, text: '贪吃蛇'},
  { id: 4, text: '跳跳'},
  { id: 5, text: 'csgo'},
  { id: 6, text: '鸭鸭收纳'}
]
const onSort = (sortedData) => {
  console.log('onSort')
  console.log(sortedData)
}

export default function TestPage (){
render () {
  return (
      <SortableList data={data} onSort={onSort}  />
    )
  }
}
```
