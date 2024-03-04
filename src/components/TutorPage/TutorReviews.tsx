import React from 'react'
import { Rating } from 'primereact/rating'
import { Button } from 'primereact/button'
import { MdOutlineDelete as DeleteIcon } from 'react-icons/md'

import Avatar from '../ui/Avatar/Avatar'
import styles from './TutorPage.module.scss'
import { useAppDispatch } from '../../redux/store'
import { customDayjs } from '../Calendar/Calendar'
import { ReviewsType } from '../../redux/tutors/tutorsTypes'
import { deleteReviews } from '../../redux/tutors/tutorsAsyncActions'

interface ITutorReviewsProps {
  reviews: ReviewsType
  user: { id: number; userRole: 'tutor' | 'student' }
}

const TutorReviews: React.FC<ITutorReviewsProps> = ({ reviews, user }) => {
  const dispatch = useAppDispatch()

  const sendedDate = customDayjs(reviews.createdAt).format('HH:MM:ss - MMMM DD, YYYY')

  const isShowEditButton = user.id === reviews.sender.id && user.userRole === reviews.sender.userRole

  const onDeleteReviews = () => {
    if (window.confirm('Ви дійсно хочете видалити відгук?')) {
      dispatch(deleteReviews(reviews.id))
    }
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.top}>
          <Avatar size="small" src={reviews.sender.avatarUrl} />
          <div className={styles.info}>
            <h6 className={styles.name}>{reviews.sender.name}</h6>
            <span className={styles['created-at']}>{sendedDate}</span>
          </div>
        </div>

        <Rating value={reviews.rating} cancel={false} stars={5} readOnly />

        <p>{reviews.message}</p>
      </div>

      {isShowEditButton && (
        <Button style={{ padding: '6px', minWidth: '33px' }} onClick={onDeleteReviews} outlined>
          <DeleteIcon size={20} />
        </Button>
      )}
    </div>
  )
}

export default TutorReviews
