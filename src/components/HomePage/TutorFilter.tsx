import React from "react"
import cn from "classnames"
import { Ripple } from "primereact/ripple"
import { Slider } from "primereact/slider"
import { Button } from "primereact/button"
import { Dropdown } from "primereact/dropdown"
import { InputText } from "primereact/inputtext"
import { Paginator } from "primereact/paginator"
import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete"
import { CiSearch as SearchIcon } from "react-icons/ci"

import styles from "./HomePage.module.scss"
import { lessonsList } from "./lessonsList"
import { LessonsFilterType } from "../../api/apiTypes"
import { useAppDispatch } from "../../redux/store"
import { getLessons } from "../../redux/lessons/lessonsAsyncActions"

const sortTypes = [
  { name: "За зменшенням ціни", value: "price-desc" },
  { name: "За зростанням ціни", value: "price-asc" },
  { name: "За кількістю відгуків", value: "reviews-desc" },
  { name: "За найвищим рейтингом", value: "rating-desc" },
]

interface ITutorFilterProps {
  filter: LessonsFilterType
  setFilter: React.Dispatch<React.SetStateAction<LessonsFilterType>>
}

const TutorFilter: React.FC<ITutorFilterProps> = ({ filter, setFilter }) => {
  const dispatch = useAppDispatch()

  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 3000])
  const [currentPage, setCurrentPage] = React.useState(1)
  const [first, setFirst] = React.useState([0, 0, 0])
  const [rows, setRows] = React.useState([10, 10, 10])

  const [activeSortType, setActiveSortType] = React.useState(sortTypes[0])

  const [filteredItems, setFilteredItems] = React.useState<{ value: string; label: string }[]>([])

  const onPageChange = (e: any, index: number) => {
    setFirst(first.map((f, i) => (index === i ? e.first : f)))
    setRows(rows.map((r, i) => (index === i ? e.rows : r)))
  }

  const onPageInputChange = (event: any) => {
    setCurrentPage(event.target.value)
  }

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

  const findLessons = () => {
    dispatch(getLessons(filter))
  }

  return (
    <div className={styles.filter}>
      <h2 className={styles["filter-title"]}>Знайдіть найкращого онлайн-репетитора</h2>

      <div className={styles["filter-item"]}>
        <b>Я хочу вивчати:</b>

        <AutoComplete
          dropdown
          name="name"
          field="label"
          value={filter.name}
          completeMethod={search}
          suggestions={filteredItems}
          virtualScrollerOptions={{ itemSize: 38 }}
          className={styles["input-full-width"]}
          onChange={(e: AutoCompleteChangeEvent) =>
            setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value.label }))
          }
        />
      </div>

      <div className={styles["filter-item"]}>
        <b>Ціна за урок:</b>
        <div className={styles["price-range"]}>
          <span>{filter.price[0]}</span>
          <span>{filter.price[1]}</span>
        </div>
        <Slider
          value={filter.price}
          onChange={(e) => setFilter((prev) => ({ ...prev, price: e.value as [number, number] }))}
          max={3000}
          range
        />
      </div>

      <div className={styles["filter-item"]}>
        <b>Сортувати за:</b>
        <br />
        <Dropdown
          value={filter.sortBy}
          onChange={(e) => setFilter((prev) => ({ ...prev, sortBy: e.value }))}
          options={sortTypes}
          optionLabel="name"
          style={{ width: "100%" }}
          placeholder="Сортувати за"
        />
      </div>

      <div className={styles["filter-item"]}>
        <b>Пошук репетитора:</b>
        <br />

        <div className={styles["search-wrapper"]}>
          <SearchIcon size={24} className={styles["search-icon"]} />
          <InputText
            placeholder="Пошук"
            className={styles["input-full-width"]}
            value={filter.tutorName}
            onChange={(e) => setFilter((prev) => ({ ...prev, tutorName: e.target.value }))}
          />
        </div>
      </div>

      <Paginator
        // template={template1}
        first={first[0]}
        rows={rows[0]}
        totalRecords={120}
        onPageChange={(e) => onPageChange(e, 0)}
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        // leftContent={leftContent}
        // rightContent={rightContent}
        style={{ marginBottom: "20px" }}
      />

      <Button style={{ width: "100%" }} label="Знайти" onClick={findLessons} />
      <Button style={{ width: "100%", marginTop: "20px" }} label="Очистити фільтр" outlined />
    </div>
  )
}

export default TutorFilter
