import React from 'react'
import { useSelector } from 'react-redux'

import styles from './HomePage.module.scss'
import { useAppDispatch } from '../../redux/store'
import { LessonsFilterType } from '../../api/apiTypes'
import { LoadingStatusTypes } from '../../redux/appTypes'
import TutorCard from '../../components/HomePage/TutorCard'
import TutorFilter from '../../components/HomePage/TutorFilter'
import { lessonsSelector } from '../../redux/lessons/lessonsSlice'
import { getLessons } from '../../redux/lessons/lessonsAsyncActions'
import LoadingSpinner from '../../components/ui/LoadingSpinner/LoadingSpinner'
import Error from '../../components/ui/Error/Error'
import CreateReservedLessonModal from '../../components/CreateReservedLessonModal/CreateReservedLessonModal'
import { LessonType } from '../../redux/lessons/lessonsType'

export const filterInitialState: LessonsFilterType = {
  name: '',
  tutorName: '',
  price: [0, 3000],
  sortBy: 'price-desc',
  currentPage: 1,
  pageSize: 10,
}

const HomePage = () => {
  const dispatch = useAppDispatch()
  const [filter, setFilter] = React.useState(filterInitialState)
  const [totalLessons, setTotalLessons] = React.useState(0)
  const [modalVisible, setModalVisible] = React.useState(false)
  const [selectedLesson, setSelectedLesson] = React.useState<LessonType | null>(null)

  const { lessons, loadingStatus } = useSelector(lessonsSelector)

  // first
  React.useEffect(() => {
    if (!lessons) {
      const fetchItems = async () => {
        const { payload } = await dispatch(getLessons(filter))
        // @ts-ignore
        setTotalLessons(payload.totalCount)
      }

      fetchItems()
    }
  }, [])

  return (
    <>
      <CreateReservedLessonModal visible={modalVisible} setVisible={setModalVisible} selectedLesson={selectedLesson} />

      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.tutors}>
            {loadingStatus === LoadingStatusTypes.LOADING ? (
              <LoadingSpinner />
            ) : loadingStatus === LoadingStatusTypes.ERROR ? (
              <Error />
            ) : (
              lessons &&
              lessons.map((lesson, index) => (
                <TutorCard
                  key={index}
                  lesson={lesson}
                  setModalVisible={setModalVisible}
                  setSelectedLesson={setSelectedLesson}
                />
              ))
            )}
          </div>

          <TutorFilter
            filter={filter}
            lessons={lessons}
            setFilter={setFilter}
            totalLessons={totalLessons}
            setTotalLessons={setTotalLessons}
          />
        </div>
      </div>
    </>
  )
}

export default HomePage
