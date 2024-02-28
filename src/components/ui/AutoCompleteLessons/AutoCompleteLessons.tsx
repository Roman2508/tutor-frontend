import React from 'react'
import {
  AutoComplete,
  AutoCompleteSelectEvent,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from 'primereact/autocomplete'

export interface ISelectItems {
  value: string
  label: string
}

interface IAutoCompleteLessonsProps {
  value: string
  selectList: ISelectItems[]
  onChange: (e: AutoCompleteChangeEvent) => void
  onSelect: (e: AutoCompleteSelectEvent) => void
  [propName: string]: any
}

const AutoCompleteLessons: React.FC<IAutoCompleteLessonsProps> = ({
  value,
  onChange,
  onSelect,
  selectList,
  propName,
}) => {
  const [filteredItems, setFilteredItems] = React.useState<{ value: string; label: string }[]>([])

  const search = (event: AutoCompleteCompleteEvent) => {
    let query = event.query
    let _filteredItems = []

    for (let i = 0; i < selectList.length; i++) {
      let item = selectList[i]
      if (item.label.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item)
      }
    }

    setFilteredItems(_filteredItems)
  }

  return (
    <AutoComplete
      dropdown
      {...propName}
      field="label"
      value={value}
      completeMethod={search}
      style={{ width: '100%' }}
      suggestions={filteredItems}
      virtualScrollerOptions={{ itemSize: 38 }}
      onSelect={(e: AutoCompleteSelectEvent) => onSelect(e)}
      onChange={(e: AutoCompleteChangeEvent) => onChange(e)}
    />
  )
}

export default AutoCompleteLessons
