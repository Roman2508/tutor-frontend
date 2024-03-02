import React from "react"
import { Card } from "primereact/card"
import { useSelector } from "react-redux"
import { Button } from "primereact/button"
import { Rating } from "primereact/rating"
import { Link, useNavigate } from "react-router-dom"

import Avatar from "../ui/Avatar/Avatar"
import styles from "./HomePage.module.scss"
import { useAppDispatch } from "../../redux/store"
import { authSelector } from "../../redux/auth/authSlice"
import { LessonType } from "../../redux/lessons/lessonsType"
import { DialogType } from "../../redux/dialogs/dialogsTypes"
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner"
import { createDialog } from "../../redux/dialogs/dialogsAsyncActions"

interface ITutorCardProps {
  lesson: LessonType
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedLesson: React.Dispatch<React.SetStateAction<LessonType | null>>
}

const TutorCard: React.FC<ITutorCardProps> = ({ lesson, setModalVisible, setSelectedLesson }) => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { auth } = useSelector(authSelector)

  if (!auth) {
    return <LoadingSpinner />
  }

  const isShowedActionButtons = auth.userRole !== "tutor"

  const onCreateDialog = async () => {
    try {
      const { payload } = await dispatch(createDialog({ tutor: lesson.tutor.id, student: auth.id }))
      navigate(`/messages/${(payload as DialogType).id}`)
    } catch (error) {
      console.error(error)
    }
  }

  const onBookLessons = async () => {
    setModalVisible(true)
    setSelectedLesson(lesson)
  }

  return (
    <Card className={styles.tutor}>
      <div className={styles["tutor-inner"]}>
        <Link to={`/tutor/${lesson.tutor.id}`}>
          <Avatar size="large" sx={{ marginRight: "16px" }} src={lesson.tutor.avatarUrl} />
        </Link>

        <div className={styles["tutor-info"]}>
          <div className={styles["tutor-info-top"]}>
            <Link to={`/tutor/${lesson.tutor.id}`} style={{ textDecoration: "none" }}>
              <h4 className={styles["lesson-name"]}>{lesson.name}</h4>
              <h5 className={styles["tutor-name"]}>{lesson.tutor.name}</h5>
            </Link>
          </div>

          <div>
            <span>Всього учнів: {lesson.tutor.studentsCount} </span>
            {!!lesson.tutor.studentsCount && (
              <>
                <span>з них </span>
                <span>{Math.floor(Math.random() * lesson.tutor.studentsCount)} активних учнів</span>
              </>
            )}
          </div>

          <p>Викладає дисципліни: {lesson.tutor.lessons.map((el) => `${el.name}, `)}</p>

          <p className={styles["tutor-info-desc"]}>{lesson.tutor.description}</p>

          <Link className={styles["tutor-link"]} to={`/tutor/${lesson.tutor.id}`}>
            Докладніше
          </Link>
        </div>

        <div className={styles["tutor-actions"]}>
          <b className={styles["lesson-rating"]}>Рейтинг:</b>
          <Rating
            style={{ justifyContent: "center" }}
            value={lesson.tutor.rating}
            cancel={false}
            stars={5}
            readOnly
          />
          <b style={{ display: "block", marginTop: "5px" }}>
            {lesson.tutor.reviews?.length} відгуків
          </b>

          <b className={styles["lesson-price-title"]}>{lesson.price}</b>
          <p className={styles["lesson-price-desc"]}>грн/{lesson.duration} хв. урок</p>

          {isShowedActionButtons && (
            <>
              <Button
                className={styles["tutor-action-button"]}
                label="Забронювати урок"
                onClick={onBookLessons}
                size="small"
              />
              <Button
                className={styles["tutor-action-button"]}
                label="Надіслати повідомлення"
                style={{ marginTop: "0.5em" }}
                onClick={onCreateDialog}
                severity="secondary"
                size="small"
              />
            </>
          )}
        </div>
      </div>
    </Card>
  )
}

export default TutorCard
