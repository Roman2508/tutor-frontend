import React from 'react'
import { Card } from 'primereact/card'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from 'primereact/button'
import { Avatar } from 'primereact/avatar'
import { Rating } from 'primereact/rating'
import { CiUser as UserIcon } from 'react-icons/ci'
import { MdOutlineAddBox as AddToFavouriteIcon } from 'react-icons/md'

import styles from './HomePage.module.scss'
import { useAppDispatch } from '../../redux/store'
import { authSelector } from '../../redux/auth/authSlice'
import { LessonType } from '../../redux/lessons/lessonsType'
import LoadingSpinner from '../ui/LoadingSpinner/LoadingSpinner'
import { createDialog } from '../../redux/dialogs/dialogsAsyncActions'
import { DialogType } from '../../redux/dialogs/dialogsTypes'

interface ITutorCardProps {
  lesson: LessonType
}

const TutorCard: React.FC<ITutorCardProps> = ({ lesson }) => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { auth } = useSelector(authSelector)

  if (!auth) {
    return <LoadingSpinner />
  }

  const isShowedActionButtons = auth.userRole !== 'tutor'

  const onCreateDialog = async () => {
    try {
      const { payload } = await dispatch(createDialog({ tutor: lesson.tutor.id, student: auth.id }))
      navigate(`/messages/${(payload as DialogType).id}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card className={styles.tutor}>
      <div className={styles['tutor-inner']}>
        <Link to={`/tutor/${lesson.tutor.id}`}>
          <Avatar icon={<UserIcon size={50} color="#fff" />} className={styles.avatar} image={lesson.tutor.avatarUrl} />
        </Link>

        <div className={styles['tutor-info']}>
          <div className={styles['tutor-info-top']}>
            <Link to={`/tutor/${lesson.tutor.id}`} style={{ textDecoration: 'none' }}>
              <h4 className={styles['lesson-name']}>{lesson.name}</h4>
              <h5 className={styles['tutor-name']}>{lesson.tutor.name}</h5>
            </Link>
            <AddToFavouriteIcon size={24} className={styles['add-to-favourite']} title='Додати в "Обрані"' />
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

          <p className={styles['tutor-info-desc']}>{lesson.tutor.description}</p>

          <Link className={styles['tutor-link']} to={`/tutor/${lesson.tutor.id}`}>
            Докладніше
          </Link>
        </div>

        <div className={styles['tutor-actions']}>
          <b className={styles['lesson-rating']}>Рейтинг:</b>
          <Rating style={{ justifyContent: 'center' }} value={lesson.tutor.rating} cancel={false} stars={5} readOnly />
          <b style={{ display: 'block', marginTop: '5px' }}>{lesson.tutor.reviews?.length} відгуків</b>

          <b className={styles['lesson-price-title']}>{lesson.price}</b>
          <p className={styles['lesson-price-desc']}>грн/{lesson.duration} хв. урок</p>

          {isShowedActionButtons && (
            <>
              <Button className={styles['tutor-action-button']} label="Забронювати урок" size="small" />
              <Button
                className={styles['tutor-action-button']}
                label="Надіслати повідомлення"
                severity="secondary"
                size="small"
                style={{ marginTop: '0.5em' }}
                onClick={onCreateDialog}
              />
            </>
          )}
        </div>
      </div>
    </Card>
  )
}

export default TutorCard
