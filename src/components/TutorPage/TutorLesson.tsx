import React from 'react'
import { Button } from 'primereact/button'
import { MdEdit as EditIcon } from 'react-icons/md'
import { FaRegBookmark as BookLessonIcon } from 'react-icons/fa'

import Avatar from '../ui/Avatar/Avatar'
import { LessonType } from '../../redux/lessons/lessonsType'
import styles from '../../pages/TutorPage/TutorPage.module.scss'
import { ILessonFormFilds } from './LessonModal'

interface ITutorLessonProps {
  lesson: LessonType
  isOwner: boolean
  onActionButtonClick: (modalData: ILessonFormFilds & { id: number }) => void
}

const TutorLesson: React.FC<ITutorLessonProps> = ({ lesson, isOwner, onActionButtonClick }) => {
  return (
    <div className={styles['lessons-wrapper']} key={lesson.id}>
      <Avatar size="small" src={lesson.tutor.avatarUrl} />

      <div className={styles['lessons-details']}>
        <div className={styles['lesson-col-left']}>
          <h4>{lesson.name}</h4>
          <h5>{lesson.tutor.name}</h5>
        </div>

        <div className={styles['lesson-col-center']}>
          <h4>{lesson.price}</h4>
          <p>грн за/{lesson.duration} хв. урок</p>
        </div>

        <div className={styles['lesson-col-right']}>
          {isOwner ? (
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
          ) : (
            <Button title="Забронювати урок">
              <BookLessonIcon size={20} />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TutorLesson
