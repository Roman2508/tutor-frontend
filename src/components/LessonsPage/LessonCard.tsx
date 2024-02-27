import React from "react"
import cn from "classnames"
import { Card } from "primereact/card"
import { Link } from "react-router-dom"

import Avatar from "../ui/Avatar/Avatar"
import styles from "./LessonsPage.module.scss"
import { ReservedLessonType } from "../../redux/reservedLessons/reservedLessonsTypes"
import dayjs from "dayjs"

interface ILessonCardProps {
  lesson: ReservedLessonType
  userRole: "tutor" | "student"
}

const LessonCard: React.FC<ILessonCardProps> = ({ lesson, userRole }) => {
  const user = {
    name: userRole === "tutor" ? lesson.student.name : lesson.tutor.name,
    avatarUrl: userRole === "tutor" ? lesson.student.avatarUrl : lesson.student.avatarUrl,
  }

  const status = lesson.status === "planned" ? "Заплановано" : "Проведено"
  const date = dayjs(lesson.startAt).add(lesson.duration, "minute").format("DD.MM.YY - hh:mm")

  return (
    <Link to={`/lesson/${lesson.id}`} style={{ textDecoration: "none" }}>
      <Card style={{ marginBottom: "20px" }}>
        <div className={styles.wrapper}>
          <div className={styles.col}>
            <Avatar size="large" shape="square" src={user.avatarUrl} />
          </div>

          <div className={cn(styles.col, styles["main-content"])}>
            <h4 className={styles["user-name"]}>{user.name}</h4>

            <p className={styles["lesson-name"]}>{lesson.name}</p>
            {lesson.theme && <p className={styles["lesson-theme"]}>{lesson.theme}</p>}
          </div>

          <div className={styles.col}>
            <div className={styles["status-wrapper"]}>
              <div className={cn(styles.badge, styles[lesson.status])}></div>
              <p className={styles.status}>{status}</p>
            </div>

            <p className={styles.date}>{date}</p>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default LessonCard
