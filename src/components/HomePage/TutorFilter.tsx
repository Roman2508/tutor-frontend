import React from "react"
import cn from "classnames"
import { Slider } from "primereact/slider"
import { Dropdown } from "primereact/dropdown"
import { InputText } from "primereact/inputtext"
import { AutoComplete } from "primereact/autocomplete"
import { CiSearch as SearchIcon } from "react-icons/ci"

import styles from "./HomePage.module.scss"
import { Button } from "primereact/button"
import { Paginator } from "primereact/paginator"
import { Ripple } from "primereact/ripple"

const sortTypes = [
  { name: "За зменшенням ціни", value: "price-desc" },
  { name: "За зростанням ціни", value: "price-asc" },
  { name: "За кількістю відгуків", value: "reviews-desc" },
  { name: "За найвищим рейтингом", value: "rating-desc" },
]

const TutorFilter = () => {
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 3000])

  const [currentPage, setCurrentPage] = React.useState(1)
  const [first, setFirst] = React.useState([0, 0, 0])
  const [rows, setRows] = React.useState([10, 10, 10])

  const [activeSortType, setActiveSortType] = React.useState(sortTypes[0])

  const onPageChange = (e: any, index: number) => {
    setFirst(first.map((f, i) => (index === i ? e.first : f)))
    setRows(rows.map((r, i) => (index === i ? e.rows : r)))
  }

  const onPageInputChange = (event: any) => {
    setCurrentPage(event.target.value)
  }

  const template1 = {
    layout: "PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport",
    PrevPageLink: (options: any) => {
      return (
        <button
          type="button"
          className={cn(options.className, "border-round")}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">Previous</span>
          <Ripple />
        </button>
      )
    },
    NextPageLink: (options: any) => {
      return (
        <button
          type="button"
          className={cn(options.className, "border-round")}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">Next</span>
          <Ripple />
        </button>
      )
    },
    PageLinks: (options: any) => {
      if (
        (options.view.startPage === options.page && options.view.startPage !== 0) ||
        (options.view.endPage === options.page && options.page + 1 !== options.totalPages)
      ) {
        const className = cn(options.className, { "p-disabled": true })

        return (
          <span className={className} style={{ userSelect: "none" }}>
            ...
          </span>
        )
      }

      return (
        <button type="button" className={options.className} onClick={options.onClick}>
          {options.page + 1}
          <Ripple />
        </button>
      )
    },
  }

  return (
    <div className={styles.filter}>
      <h2 className={styles["filter-title"]}>Знайдіть найкращого онлайн-репетитора</h2>

      <div className={styles["filter-item"]}>
        <b>Я хочу вивчати:</b>
        <AutoComplete
          // value={value}
          // suggestions={items}
          // completeMethod={search}
          // onChange={(e) => setValue(e.value)}
          placeholder="Я хочу вивчати"
          className={styles["input-full-width"]}
          dropdown
        />
      </div>

      <div className={styles["filter-item"]}>
        <b>Ціна за урок:</b>
        <div className={styles["price-range"]}>
          <span>{priceRange[0]}</span>
          <span>{priceRange[1]}</span>
        </div>
        <Slider
          value={priceRange}
          onChange={(e) => setPriceRange(e.value as [number, number])}
          max={3000}
          range
        />
      </div>

      <div className={styles["filter-item"]}>
        <b>Сортувати за:</b>
        <br />
        <Dropdown
          value={activeSortType.name}
          onChange={(e) => setActiveSortType({ name: e.value, value: e.value })}
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
          <InputText placeholder="Пошук" className={styles["input-full-width"]} />
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

      <Button style={{ width: "100%" }} label="Знайти" />
      <Button style={{ width: "100%", marginTop: "20px" }} label="Очистити фільтр" outlined />
    </div>
  )
}

export default TutorFilter
