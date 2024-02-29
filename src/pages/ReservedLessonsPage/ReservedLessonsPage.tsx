import React from "react"
import { useSelector } from "react-redux"

import { useAppDispatch } from "../../redux/store"
import styles from "./ReservedLessonsPage.module.scss"
import { authSelector } from "../../redux/auth/authSlice"
import { LoadingStatusTypes } from "../../redux/appTypes"
import LessonCard from "../../components/LessonsPage/LessonCard"
import { GetResevedLessonsResponceType } from "../../api/apiTypes"
import { filterUniqueNames } from "../../helpers/filterUniqueNames"
import LessonsFilter from "../../components/LessonsPage/LessonsFilter"
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner"
import { ReservedLessonType } from "../../redux/reservedLessons/reservedLessonsTypes"
import EditReservedLessonPage from "../../components/LessonsPage/EditReservedLessonPage"
import { reservedLessonsSelector } from "../../redux/reservedLessons/reservedLessonsSlice"
import { ISelectItems } from "../../components/ui/AutoCompleteLessons/AutoCompleteLessons"
import { getReservedLessons } from "../../redux/reservedLessons/reservedLessonsAsyncActions"

export interface IReservedLessonsFilterState {
  name: string
  pageSize: number
  currentPage: number
  status: "all" | "planned" | "conducted"
  tutor: { value: number; label: string }
  student: { value: number; label: string }
  sortBy: "price-desc" | "price-asc" | "reviews-desc" | "rating-desc"
}

export const filterInititalState: IReservedLessonsFilterState = {
  name: "",
  pageSize: 3,
  currentPage: 1,
  status: "all",
  sortBy: "price-desc",
  tutor: { value: 0, label: "" },
  student: { value: 0, label: "" },
}

const ReservedLessonsPage = () => {
  const dispatch = useAppDispatch()

  const { auth } = useSelector(authSelector)
  const { reservedLessons, loadingStatus } = useSelector(reservedLessonsSelector)

  const [editableLesson, setEditableLesson] = React.useState<ReservedLessonType | null>(null)
  const [allLessonsSelect, setAllLessonsSelect] = React.useState<ISelectItems[]>([])
  const [allUsersSelect, setAllUsersSelect] = React.useState<ISelectItems[]>([])
  const [filter, setFilter] = React.useState(filterInititalState)
  const [modalVisible, setModalVisible] = React.useState(false)
  const [totalLessons, setTotalLessons] = React.useState(0)

  React.useEffect(() => {
    if (reservedLessons || !auth) return

    const fetchData = async () => {
      setFilter((prev) => ({ ...prev, [auth.userRole]: auth.id }))
      const { student, tutor, ...rest } = filter
      const { payload } = await dispatch(getReservedLessons({ ...rest, [auth.userRole]: auth.id }))
      setTotalLessons((payload as GetResevedLessonsResponceType).totalCount)

      const lessons: ISelectItems[] = (payload as GetResevedLessonsResponceType).entities.map(
        (el: ReservedLessonType) => {
          return { value: String(el.id), label: el.name }
        }
      )

      const users: ISelectItems[] = (payload as GetResevedLessonsResponceType).entities.map(
        (el: ReservedLessonType) => {
          const userFieldName = auth.userRole === "tutor" ? "student" : "tutor"
          return { value: String(el[userFieldName].id), label: el[userFieldName].name }
        }
      )

      setAllUsersSelect(filterUniqueNames(users))
      setAllLessonsSelect(filterUniqueNames(lessons))
    }

    fetchData()
  }, [auth])

  return (
    <>
      <EditReservedLessonPage visible={modalVisible} setVisible={setModalVisible} editableLesson={editableLesson} />

      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.tutors}>
            {!reservedLessons || loadingStatus === LoadingStatusTypes.LOADING || !auth ? (
              <LoadingSpinner />
            ) : (
              reservedLessons.map((lesson, index) => (
                <LessonCard
                  key={index}
                  lesson={lesson}
                  userRole={auth.userRole}
                  setVisible={setModalVisible}
                  setEditableLesson={setEditableLesson}
                />
              ))
            )}
          </div>

          <LessonsFilter
            auth={auth}
            filter={filter}
            setFilter={setFilter}
            totalLessons={totalLessons}
            loadingStatus={loadingStatus}
            allUsersSelect={allUsersSelect}
            reservedLessons={reservedLessons}
            setTotalLessons={setTotalLessons}
            allLessonsSelect={allLessonsSelect}
          />
        </div>
      </div>
    </>
  )
}

export default ReservedLessonsPage