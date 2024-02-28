import React from 'react'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { Paginator } from 'primereact/paginator'
import { RadioButton } from 'primereact/radiobutton'
import { AutoComplete } from 'primereact/autocomplete'

import styles from './LessonsPage.module.scss'
import { useSelector } from 'react-redux'
import { authSelector } from '../../redux/auth/authSlice'
import LoadingSpinner from '../ui/LoadingSpinner/LoadingSpinner'
import AutoCompleteLessons, { ISelectItems } from '../ui/AutoCompleteLessons/AutoCompleteLessons'
import { ReservedLessonsFilterType } from '../../api/apiTypes'
import { IReservedLessonsFilterState } from '../../pages/ReservedLessonsPage/ReservedLessonsPage'

const sortTypes = [
  { name: 'За зменшенням ціни', value: 'price-desc' },
  { name: 'За зростанням ціни', value: 'price-asc' },
  { name: 'За кількістю відгуків', value: 'reviews-desc' },
  { name: 'За найвищим рейтингом', value: 'rating-desc' },
]

interface ILessonsFilterProps {
  allUsersSelect: ISelectItems[]
  allLessonsSelect: ISelectItems[]
  filter: IReservedLessonsFilterState
  setFilter: React.Dispatch<React.SetStateAction<IReservedLessonsFilterState>>
}

const LessonsFilter: React.FC<ILessonsFilterProps> = ({ filter, setFilter, allUsersSelect, allLessonsSelect }) => {
  const { auth } = useSelector(authSelector)

  const [activeSortType, setActiveSortType] = React.useState(sortTypes[0])

  const [first, setFirst] = React.useState([0, 0, 0])
  const [rows, setRows] = React.useState([10, 10, 10])

  const onPageChange = (e: any, index: number) => {
    setFirst(first.map((f, i) => (index === i ? e.first : f)))
    setRows(rows.map((r, i) => (index === i ? e.rows : r)))
  }

  return (
    <div className={styles.filter}>
      {!auth ? (
        <LoadingSpinner />
      ) : (
        <>
          <h2 className={styles['filter-title']}>Мої уроки</h2>

          <div className={styles['filter-item']}>
            <b>Дисципліна:</b>
            <AutoCompleteLessons
              name="name"
              selectList={allLessonsSelect}
              value={String(filter.name || '')}
              onChange={(e) => setFilter((prev) => ({ ...prev, name: e.value }))}
              onSelect={(e) => setFilter((prev) => ({ ...prev, name: e.value.label }))}
            />
          </div>

          {auth.userRole === 'tutor' ? (
            <div className={styles['filter-item']}>
              <b>Студенти:</b>
              <AutoCompleteLessons
                name="student"
                selectList={allUsersSelect}
                value={String(filter.student?.label || '')}
                onSelect={(e) => setFilter((prev) => ({ ...prev, student: e.value }))}
                onChange={(e) => setFilter((prev) => ({ ...prev, student: { ...prev.student, label: e.value } }))}
              />
            </div>
          ) : (
            <div className={styles['filter-item']}>
              <b>Репетитори:</b>
              <AutoCompleteLessons
                name="tutor"
                selectList={allUsersSelect}
                value={String(filter.tutor?.label || '')}
                onSelect={(e) => setFilter((prev) => ({ ...prev, tutor: e.value }))}
                onChange={(e) => setFilter((prev) => ({ ...prev, tutor: { ...prev.tutor, label: e.value } }))}
              />
            </div>
          )}

          <div className={styles['radio-group']}>
            {[
              { label: 'Всі', type: 'all' },
              { label: 'Заплановані', type: 'planned' },
              { label: 'Проведені', type: 'conducted' },
            ].map((el) => (
              <div className={styles['radio-button']} key={el.type}>
                <RadioButton
                  name="status"
                  value={el.type}
                  inputId={el.type}
                  checked={filter.status === el.type}
                  onChange={(e) => {
                    console.log(e)
                    setFilter((prev) => ({ ...prev, status: e.value }))
                  }}
                />
                <label htmlFor={el.type} className={styles['radio-label']}>
                  {el.label}
                </label>
              </div>
            ))}
          </div>

          <div className={styles['filter-item']}>
            <b>Сортувати за:</b>
            <br />
            <Dropdown
              optionLabel="name"
              options={sortTypes}
              value={filter.sortBy}
              style={{ width: '100%' }}
              placeholder="Сортувати за"
              onChange={(e) => setFilter((prev) => ({ ...prev, sortBy: e.value }))}
            />
          </div>

          <Paginator
            rows={rows[0]}
            first={first[0]}
            totalRecords={120}
            style={{ marginBottom: '20px' }}
            onPageChange={(e) => onPageChange(e, 0)}
            template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          />

          <Button style={{ width: '100%' }} label="Знайти" />
          <Button style={{ width: '100%', marginTop: '20px' }} label="Очистити фільтр" outlined />
        </>
      )}
    </div>
  )
}

export default LessonsFilter
