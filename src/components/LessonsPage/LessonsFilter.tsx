import React from 'react'
import { Slider } from 'primereact/slider'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { AutoComplete } from 'primereact/autocomplete'
import { RadioButton } from 'primereact/radiobutton'
import { CiSearch as SearchIcon } from 'react-icons/ci'

import styles from './LessonsPage.module.scss'

const sortTypes = [
  { name: 'За популярністю', value: 'popular' },
  { name: 'За зменшенням ціни', value: 'price-desc' },
  { name: 'За зростанням ціни', value: 'price-asc' },
  { name: 'За кількістю відгуків', value: 'reviews' },
  { name: 'За найвищим рейтингом', value: 'rating' },
]

const LessonsFilter = () => {
  const [userRole, setUserRole] = React.useState<'tutor' | 'student'>('tutor')

  const [lessonType, setLessonType] = React.useState<'all' | 'planned' | 'conducted'>('all')

  const [activeSortType, setActiveSortType] = React.useState(sortTypes[0])

  return (
    <div className={styles.filter}>
      <h2 className={styles['filter-title']}>Мої уроки</h2>

      <div className={styles['filter-item']}>
        <b>Дисципліна:</b>
        <AutoComplete placeholder="Дисципліна" className={styles['input-full-width']} dropdown />
      </div>

      {userRole === 'tutor' ? (
        <div className={styles['filter-item']}>
          <b>Студенти:</b>
          <AutoComplete placeholder="Студенти" className={styles['input-full-width']} dropdown />
        </div>
      ) : (
        <div className={styles['filter-item']}>
          <b>Репетитори:</b>
          <AutoComplete placeholder="Репетитори" className={styles['input-full-width']} dropdown />
        </div>
      )}

      <div className={styles['radio-group']}>
        <div className={styles['radio-button']}>
          <RadioButton
            inputId="lesson1"
            name="pizza"
            value="all"
            onChange={(e) => setLessonType(e.value)}
            checked={lessonType === 'all'}
          />
          <label htmlFor="lesson1" className={styles['radio-label']}>
            Всі
          </label>
        </div>
        <div className={styles['radio-button']}>
          <RadioButton
            inputId="lesson2"
            name="pizza"
            value="planned"
            onChange={(e) => setLessonType(e.value)}
            checked={lessonType === 'planned'}
          />
          <label htmlFor="lesson2" className={styles['radio-label']}>
            Заплановані
          </label>
        </div>
        <div className={styles['radio-button']}>
          <RadioButton
            inputId="lesson3"
            name="pizza"
            value="conducted"
            onChange={(e) => setLessonType(e.value)}
            checked={lessonType === 'conducted'}
          />
          <label htmlFor="lesson3" className={styles['radio-label']}>
            Проведені
          </label>
        </div>
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

      <Button style={{ width: '100%' }} label="Знайти" />
      <Button style={{ width: '100%', marginTop: '20px' }} label="Очистити фільтр" outlined />
    </div>
  )
}

export default LessonsFilter
