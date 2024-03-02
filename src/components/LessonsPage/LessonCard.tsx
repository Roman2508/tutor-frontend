import React from "react"
import dayjs from "dayjs"
import cn from "classnames"
import { Card } from "primereact/card"
import { Link } from "react-router-dom"
import { MdOutlineDeleteOutline } from "react-icons/md"
import { RiEdit2Line as EditIcon } from "react-icons/ri"

import Avatar from "../ui/Avatar/Avatar"
import { Button } from "primereact/button"
import styles from "./LessonsPage.module.scss"
import { useAppDispatch } from "../../redux/store"
import { ReservedLessonType } from "../../redux/reservedLessons/reservedLessonsTypes"
import { deleteReservedLesson } from "../../redux/reservedLessons/reservedLessonsAsyncActions"

interface ILessonCardProps {
  lesson: ReservedLessonType
  userRole: "tutor" | "student"
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  setEditableLesson: React.Dispatch<React.SetStateAction<ReservedLessonType | null>>
}

const LessonCard: React.FC<ILessonCardProps> = ({
  lesson,
  userRole,
  setVisible,
  setEditableLesson,
}) => {
  const dispatch = useAppDispatch()

  const user = {
    name: userRole === "tutor" ? lesson.student.name : lesson.tutor.name,
    avatarUrl: userRole === "tutor" ? lesson.student.avatarUrl : lesson.tutor.avatarUrl,
  }

  const status = lesson.status === "planned" ? "Заплановано" : "Проведено"
  const date = dayjs(lesson.startAt).add(lesson.duration, "minute").format("DD.MM.YY - hh:mm")

  const onDeleteLesson = () => {
    if (window.confirm("Ви дійсно хочете видалити урок?")) {
      dispatch(deleteReservedLesson(lesson.id))
    }
  }

  return (
    <Card style={{ marginBottom: "20px" }}>
      <div className={styles.wrapper}>
        <Link
          to={`/lesson/${lesson.id}`}
          className={styles["left-col"]}
          style={{ textDecoration: "none" }}
        >
          <Avatar size="large" shape="square" src={user.avatarUrl} />
        </Link>

        <Link
          to={`/lesson/${lesson.id}`}
          style={{ textDecoration: "none" }}
          className={cn(styles.col, styles["main-content"])}
        >
          <h4 className={styles["user-name"]}>{user.name}</h4>

          <p className={styles["lesson-name"]}>{lesson.name}</p>
          {lesson.theme && <p className={styles["lesson-theme"]}>{lesson.theme}</p>}
        </Link>

        <div
          style={{
            display: "flex",
            justifyContent: "end",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <div className={styles["right-col"]}>
            <div>
              <p className={styles.price}>{lesson.price} грн.</p>
              <p className={styles.duration}>{lesson.duration} хв. урок </p>
            </div>

            <div style={{ marginLeft: "30px" }}>
              <div className={styles["status-wrapper"]}>
                <div className={cn(styles.badge, styles[lesson.status])}></div>
                <p className={styles.status}>{status}</p>
              </div>

              <p className={styles.date}>{date}</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            {lesson.meetUrl && (
              <a href={lesson.meetUrl} className={styles.link} target="_blank">
                Посилання на онлайн-урок
              </a>
            )}

            {userRole === "tutor" && (
              <div>
                <Button
                  outlined
                  onClick={() => {
                    setEditableLesson(lesson)
                    setVisible(true)
                  }}
                  title="Редагувати"
                >
                  <EditIcon size={24} />
                </Button>

                <Button
                  outlined
                  severity="danger"
                  title="Відмінити урок"
                  style={{ marginLeft: "10px" }}
                  onClick={onDeleteLesson}
                >
                  <MdOutlineDeleteOutline size={24} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default LessonCard
