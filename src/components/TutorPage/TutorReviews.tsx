import React from 'react'
import dayjs from 'dayjs'
import { Rating } from 'primereact/rating'

import Avatar from '../ui/Avatar/Avatar'
import styles from './TutorPage.module.scss'
import { ReviewsType } from '../../redux/tutors/tutorsTypes'

interface ITutorReviewsProps {
  reviews: ReviewsType
}

const TutorReviews: React.FC<ITutorReviewsProps> = ({ reviews }) => {
  const sendedDate = dayjs(reviews.createdAt).format('MMMM DD, YYYY')

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <Avatar size="small" src={reviews.sender.avatarUrl} />
        <div className={styles.info}>
          <h6 className={styles.name}>{reviews.sender.name}</h6>
          <span className={styles['created-at']}>{sendedDate}</span>
        </div>
      </div>

      <Rating value={reviews.rating} cancel={false} stars={5} readOnly />

      <p className={styles.comment}>{reviews.message}</p>
    </div>
  )
}

export default TutorReviews
