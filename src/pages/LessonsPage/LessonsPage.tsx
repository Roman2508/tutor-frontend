import styles from "./LessonsPage.module.scss"
import LessonCard from "../../components/LessonsPage/LessonCard"
import LessonsFilter from "../../components/LessonsPage/LessonsFilter"

const LessonsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.tutors}>
          {Array(12)
            .fill(null)
            .map((_, index) => (
              <LessonCard key={index} />
            ))}
        </div>

        <LessonsFilter />
      </div>
    </div>
  )
}

export default LessonsPage
