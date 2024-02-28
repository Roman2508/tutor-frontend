import React from 'react'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '../../redux/store'
import styles from './ReservedLessonsPage.module.scss'
import { authSelector } from '../../redux/auth/authSlice'
import { LoadingStatusTypes } from '../../redux/appTypes'
import LessonCard from '../../components/LessonsPage/LessonCard'
import { filterUniqueNames } from '../../helpers/filterUniqueNames'
import LessonsFilter from '../../components/LessonsPage/LessonsFilter'
import LoadingSpinner from '../../components/ui/LoadingSpinner/LoadingSpinner'
import { ReservedLessonType } from '../../redux/reservedLessons/reservedLessonsTypes'
import { reservedLessonsSelector } from '../../redux/reservedLessons/reservedLessonsSlice'
import { getReservedLessons } from '../../redux/reservedLessons/reservedLessonsAsyncActions'
import { ISelectItems } from '../../components/ui/AutoCompleteLessons/AutoCompleteLessons'

export interface IReservedLessonsFilterState {
  name: ''
  pageSize: 3
  currentPage: 1
  sortBy: 'price-desc'
  status: 'all' | 'planned' | 'conducted'
  tutor: { value: number; label: string }
  student: { value: number; label: string }
}

const filterInititalState: IReservedLessonsFilterState = {
  name: '',
  pageSize: 3,
  status: 'all',
  currentPage: 1,
  sortBy: 'price-desc',
  tutor: { value: 0, label: '' },
  student: { value: 0, label: '' },
}

const ReservedLessonsPage = () => {
  const dispatch = useAppDispatch()

  const { auth } = useSelector(authSelector)
  const { reservedLessons, loadingStatus } = useSelector(reservedLessonsSelector)

  const [allUsersSelect, setAllUsersSelect] = React.useState<ISelectItems[]>([])
  const [allLessonsSelect, setAllLessonsSelect] = React.useState<ISelectItems[]>([])

  const [filter, setFilter] = React.useState(filterInititalState)

  React.useEffect(() => {
    if (reservedLessons || !auth) return

    const fetchData = async () => {
      setFilter((prev) => ({ ...prev, [auth.userRole]: auth.id }))
      const { student, tutor, ...rest } = filter
      const { payload } = await dispatch(getReservedLessons({ ...rest, [auth.userRole]: auth.id }))

      const lessons: ISelectItems[] = payload.entities.map((el: ReservedLessonType) => {
        return { value: String(el.id), label: el.name }
      })

      const users: ISelectItems[] = payload.entities.map((el: ReservedLessonType) => {
        const userFieldName = auth.userRole === 'tutor' ? 'student' : 'tutor'
        return { value: String(el[userFieldName].id), label: el[userFieldName].name }
      })

      setAllLessonsSelect(filterUniqueNames(lessons))
      setAllUsersSelect(filterUniqueNames(users))
    }

    fetchData()
  }, [auth])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.tutors}>
          {!reservedLessons || loadingStatus === LoadingStatusTypes.LOADING || !auth ? (
            <LoadingSpinner />
          ) : (
            reservedLessons.map((lesson, index) => <LessonCard key={index} lesson={lesson} userRole={auth.userRole} />)
          )}
        </div>

        <LessonsFilter
          filter={filter}
          setFilter={setFilter}
          allUsersSelect={allUsersSelect}
          allLessonsSelect={allLessonsSelect}
        />
      </div>
    </div>
  )
}

export default ReservedLessonsPage
