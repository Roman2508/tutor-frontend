import React from "react"
import {
  AutoComplete,
  AutoCompleteSelectEvent,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete"

interface IAutoCompleteLessonsProps {
  value: string
  lessonsList: { value: string; label: string }[]
  onChange: (e: AutoCompleteChangeEvent) => void
  onSelect: (e: AutoCompleteSelectEvent) => void
  [propName: string]: any
}

const AutoCompleteLessons: React.FC<IAutoCompleteLessonsProps> = ({
  value,
  onChange,
  onSelect,
  lessonsList,
  propName,
}) => {
  const [filteredItems, setFilteredItems] = React.useState<{ value: string; label: string }[]>([])

  const search = (event: AutoCompleteCompleteEvent) => {
    let query = event.query
    let _filteredItems = []

    for (let i = 0; i < lessonsList.length; i++) {
      let item = lessonsList[i]
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
      style={{ width: "100%" }}
      suggestions={filteredItems}
      virtualScrollerOptions={{ itemSize: 38 }}
      onSelect={(e: AutoCompleteSelectEvent) => onSelect(e)}
      onChange={(e: AutoCompleteChangeEvent) => onChange(e)}
    />
  )
}

export default AutoCompleteLessons
