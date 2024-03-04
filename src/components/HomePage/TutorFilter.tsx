import React from 'react'
import { Slider } from 'primereact/slider'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { CiSearch as SearchIcon } from 'react-icons/ci'
import { AutoCompleteChangeEvent } from 'primereact/autocomplete'
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator'

import styles from './HomePage.module.scss'
import { useAppDispatch } from '../../redux/store'
import { LessonsFilterType } from '../../api/apiTypes'
import { LessonType } from '../../redux/lessons/lessonsType'
import { filterInitialState } from '../../pages/HomePage/HomePage'
import { lessonsList } from '../ui/AutoCompleteLessons/lessonsList'
import { getLessons } from '../../redux/lessons/lessonsAsyncActions'
import AutoCompleteLessons from '../ui/AutoCompleteLessons/AutoCompleteLessons'

const sortTypes = [
  { name: 'За зменшенням ціни', value: 'price-desc' },
  { name: 'За зростанням ціни', value: 'price-asc' },
  { name: 'За кількістю відгуків', value: 'reviews-desc' },
  { name: 'За найвищим рейтингом', value: 'rating-desc' },
]

interface ITutorFilterProps {
  totalLessons: number
  filter: LessonsFilterType
  lessons: LessonType[] | null
  setTotalLessons: React.Dispatch<React.SetStateAction<number>>
  setFilter: React.Dispatch<React.SetStateAction<LessonsFilterType>>
}

const TutorFilter: React.FC<ITutorFilterProps> = ({ filter, setFilter, lessons, totalLessons, setTotalLessons }) => {
  const dispatch = useAppDispatch()

  const onPageChange = (e: PaginatorPageChangeEvent) => {
    setFilter((prev) => ({ ...prev, currentPage: e.page + 1 }))
  }

  const findLessons = async () => {
    const { payload } = await dispatch(getLessons(filter))
    // @ts-ignore
    setTotalLessons(payload.totalCount)
  }

  React.useEffect(() => {
    if (!lessons) return
    findLessons()
  }, [filter.currentPage])

  return (
    <div className={styles.filter}>
      <h2 className={styles['filter-title']}>Знайдіть найкращого онлайн-репетитора</h2>

      <div className={styles['filter-item']}>
        <b>Я хочу вивчати:</b>

        <AutoCompleteLessons
          name="name"
          value={filter.name}
          selectList={lessonsList}
          onSelect={(e) => setFilter((prev) => ({ ...prev, name: e.value.label }))}
          onChange={(e: AutoCompleteChangeEvent) => setFilter((prev) => ({ ...prev, name: e.value }))}
        />
      </div>

      <div className={styles['filter-item']}>
        <b>Ціна за урок:</b>
        <div className={styles['price-range']}>
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

      <div className={styles['filter-item']}>
        <b>Сортувати за:</b>
        <br />
        <Dropdown
          value={filter.sortBy}
          onChange={(e) => setFilter((prev) => ({ ...prev, sortBy: e.value }))}
          options={sortTypes}
          optionLabel="name"
          style={{ width: '100%' }}
          placeholder="Сортувати за"
        />
      </div>

      <div className={styles['filter-item']}>
        <b>Пошук репетитора:</b>
        <br />

        <div className={styles['search-wrapper']}>
          <SearchIcon size={24} className={styles['search-icon']} />
          <InputText
            placeholder="Пошук"
            className={styles['input-full-width']}
            value={filter.tutorName}
            onChange={(e) => setFilter((prev) => ({ ...prev, tutorName: e.target.value }))}
          />
        </div>
      </div>

      <b>Сторінка:</b>
      <Paginator
        // current showed page
        rows={filter.pageSize}
        // total items count
        totalRecords={totalLessons}
        style={{ marginBottom: '20px' }}
        onPageChange={(e) => onPageChange(e)}
        // index of first item in current showed page
        first={filter.currentPage * filter.pageSize - 1}
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      />

      <Button style={{ width: '100%' }} label="Знайти" onClick={findLessons} />
      <Button
        outlined
        label="Очистити фільтр"
        style={{ width: '100%', marginTop: '20px' }}
        onClick={() => setFilter(filterInitialState)}
      />
    </div>
  )
}

export default TutorFilter
