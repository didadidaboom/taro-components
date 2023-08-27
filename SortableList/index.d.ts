interface SortableListDataItem {
  id: number,
  text: string,
  [key: string]: any
}

interface SortableListProps {
  data: SortableListDataItem[],
  onSort?: (data: SortableListDataItem[]) => void,
  itemHeight?: number,
  itemGap?: number,
  itemClassName?: string
}
