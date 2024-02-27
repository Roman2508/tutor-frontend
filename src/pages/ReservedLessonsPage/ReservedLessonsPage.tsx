import React from "react"
import { useSelector } from "react-redux"

import { useAppDispatch } from "../../redux/store"
import styles from "./ReservedLessonsPage.module.scss"
import LessonCard from "../../components/LessonsPage/LessonCard"
import LessonsFilter from "../../components/LessonsPage/LessonsFilter"
import { reservedLessonsSelector } from "../../redux/reservedLessons/reservedLessonsSlice"
import { getReservedLessons } from "../../redux/reservedLessons/reservedLessonsAsyncActions"
import { authSelector } from "../../redux/auth/authSlice"
import { ReservedLessonsFilterType } from "../../api/apiTypes"
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner"
import { LoadingStatusTypes } from "../../redux/appTypes"

const filterInititalState: ReservedLessonsFilterType = {
  name: "",
  /*  student: 0,
  tutor: 0, */
  sortBy: "price-desc",
  currentPage: 1,
  pageSize: 3,
}

const ReservedLessonsPage = () => {
  const dispatch = useAppDispatch()

  const { auth } = useSelector(authSelector)
  const { reservedLessons, loadingStatus } = useSelector(reservedLessonsSelector)

  const [filter, setFilter] = React.useState(filterInititalState)

  React.useEffect(() => {
    if (reservedLessons || !auth) return

    const fetchData = async () => {
      setFilter((prev) => ({ ...prev, [auth.userRole]: auth.id }))
      const { payload } = await dispatch(
        getReservedLessons({ ...filter, [auth.userRole]: auth.id })
      )
      console.log(payload)
    }

    fetchData()
  }, [auth])

  // console.log(filter)

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.tutors}>
          {!reservedLessons || loadingStatus === LoadingStatusTypes.LOADING || !auth ? (
            <LoadingSpinner />
          ) : (
            reservedLessons.map((lesson, index) => (
              <LessonCard key={index} lesson={lesson} userRole={auth.userRole} />
            ))
          )}
        </div>

        <LessonsFilter filter={filter} setFilter={setFilter} />
      </div>
    </div>
  )
}

export default ReservedLessonsPage
