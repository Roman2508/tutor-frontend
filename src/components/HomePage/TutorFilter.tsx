import React from 'react'
import { Slider } from 'primereact/slider'
import { CiSearch as SearchIcon } from 'react-icons/ci'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { AutoComplete } from 'primereact/autocomplete'

import styles from './HomePage.module.scss'

const sortTypes = [
  { name: 'За популярністю', value: 'popular' },
  { name: 'За зменшенням ціни', value: 'price-desc' },
  { name: 'За зростанням ціни', value: 'price-asc' },
  { name: 'За кількістю відгуків', value: 'reviews' },
  { name: 'За найвищим рейтингом', value: 'rating' },
]

const TutorFilter = () => {
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 3000])

  const [activeSortType, setActiveSortType] = React.useState(sortTypes[0])

  return (
    <div className={styles.filter}>
      <h2 className={styles['filter-title']}>Знайдіть найкращого онлайн-репетитора</h2>

      <div className={styles['filter-item']}>
        <b>Я хочу вивчати:</b>
        <AutoComplete
          // value={value}
          // suggestions={items}
          // completeMethod={search}
          // onChange={(e) => setValue(e.value)}
          placeholder="Я хочу вивчати"
          className={styles['input-full-width']}
          dropdown
        />
      </div>

      <div className={styles['filter-item']}>
        <b>Ціна за урок:</b>
        <div className={styles['price-range']}>
          <span>{priceRange[0]}</span>
          <span>{priceRange[1]}</span>
        </div>
        <Slider value={priceRange} onChange={(e) => setPriceRange(e.value as [number, number])} max={3000} range />
      </div>

      <div className={styles['filter-item']}>
        <b>Сортувати за:</b>
        <br />
        <Dropdown
          value={activeSortType.name}
          onChange={(e) => setActiveSortType({ name: e.value, value: e.value })}
          options={sortTypes}
          optionLabel="name"
          style={{ width: '100%' }}
          placeholder="Сортувати за"
        />
      </div>

      <div className={styles['filter-item']}>
        <b>Пошук:</b>
        <br />

        <div className={styles['search-wrapper']}>
          <SearchIcon size={24} className={styles['search-icon']} />
          <InputText placeholder="Пошук" className={styles['input-full-width']} />
        </div>
      </div>
    </div>
  )
}

export default TutorFilter
