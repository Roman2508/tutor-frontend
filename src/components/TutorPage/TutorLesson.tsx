import React from "react"
import { Button } from "primereact/button"
import { MdEdit as EditIcon } from "react-icons/md"
import { MdDeleteOutline as DeleteIcon } from "react-icons/md"
import { FaRegBookmark as BookLessonIcon } from "react-icons/fa"

import Avatar from "../ui/Avatar/Avatar"
import { ILessonFormFilds } from "./LessonModal"
import { useAppDispatch } from "../../redux/store"
import { LessonType } from "../../redux/lessons/lessonsType"
import styles from "../../pages/TutorPage/TutorPage.module.scss"
import { deleteLesson } from "../../redux/lessons/lessonsAsyncActions"

interface ITutorLessonProps {
  lesson: LessonType
  isOwner: boolean
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedLesson: React.Dispatch<React.SetStateAction<LessonType | null>>
  onActionButtonClick: (modalData: ILessonFormFilds & { id: number }) => void
}

const TutorLesson: React.FC<ITutorLessonProps> = ({
  lesson,
  isOwner,
  setModalVisible,
  setSelectedLesson,
  onActionButtonClick,
}) => {
  const dispatch = useAppDispatch()

  const onDeleteLesson = () => {
    if (window.confirm("Ви дійсно хочете видалити урок?")) {
      dispatch(deleteLesson(lesson.id))
    }
  }

  const onBookLesson = () => {
    setModalVisible(true)
    setSelectedLesson(lesson)
  }

  return (
    <div className={styles["lessons-wrapper"]} key={lesson.id}>
      <Avatar size="small" src={lesson.tutor.avatarUrl} />

      <div className={styles["lessons-details"]}>
        <div className={styles["lesson-col-left"]}>
          <h4>{lesson.name}</h4>
          <h5>{lesson.tutor.name}</h5>
        </div>

        <div className={styles["lesson-col-center"]}>
          <h4>{lesson.price}</h4>
          <p>грн за/{lesson.duration} хв. урок</p>
        </div>

        <div className={styles["lesson-col-right"]}>
          {isOwner ? (
            <div>
              <Button
                title="Редагувати"
                onClick={() =>
                  onActionButtonClick({
                    duration: lesson.duration,
                    price: lesson.price,
                    name: lesson.name,
                    id: lesson.id,
                  })
                }
              >
                <EditIcon size={20} />
              </Button>

              <Button
                style={{ marginLeft: "10px" }}
                severity="danger"
                title="Видалити"
                outlined
                onClick={onDeleteLesson}
              >
                <DeleteIcon size={20} />
              </Button>
            </div>
          ) : (
            <Button title="Забронювати урок" onClick={onBookLesson}>
              <BookLessonIcon size={20} />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TutorLesson
