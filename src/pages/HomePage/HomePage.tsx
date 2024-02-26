import React from "react"
import { useSelector } from "react-redux"
import { Button } from "primereact/button"
import { ProgressSpinner } from "primereact/progressspinner"

import styles from "./HomePage.module.scss"
import { useAppDispatch } from "../../redux/store"
import TutorCard from "../../components/HomePage/TutorCard"
import TutorFilter from "../../components/HomePage/TutorFilter"
import { lessonsSelector } from "../../redux/lessons/lessonsSlice"
import { getLessons } from "../../redux/lessons/lessonsAsyncActions"
import { LessonsFilterType } from "../../api/apiTypes"

const filterInitialState: LessonsFilterType = {
  name: "",
  tutorName: "",
  price: [0, 3000],
  sortBy: "price-desc",
  currentPage: 1,
  pageSize: 20,
}

const HomePage = () => {
  const dispatch = useAppDispatch()
  const [filter, setFilter] = React.useState(filterInitialState)

  const { lessons } = useSelector(lessonsSelector)

  React.useEffect(() => {
    if (!lessons) {
      dispatch(getLessons(filter))
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.tutors}>
          {lessons ? (
            lessons.map((lesson, index) => <TutorCard key={index} lesson={lesson} />)
          ) : (
            <div
              style={{
                height: "70vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ProgressSpinner strokeWidth="4" style={{ width: "50px", height: "50px" }} />
            </div>
          )}
        </div>

        <TutorFilter filter={filter} setFilter={setFilter} />
      </div>
    </div>
  )
}

export default HomePage
