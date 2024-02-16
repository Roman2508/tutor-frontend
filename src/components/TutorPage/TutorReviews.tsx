import React from 'react'

import { CiUser as UserIcon } from 'react-icons/ci'
import { MdOutlineAddBox as AddToFavouriteIcon } from 'react-icons/md'

import styles from './TutorPage.module.scss'
import { Rating } from 'primereact/rating'
import Avatar from '../ui/Avatar/Avatar'

const TutorReviews = () => {
  const [rating, setRating] = React.useState(0)

  return (
    <div className={styles.wrapper}>
      <div>
        <Avatar size="small" />
        <h6>Student Name</h6>
        <span>січень 12, 2024</span>
      </div>

      <Rating onChange={(e) => setRating(Number(e.value))} value={rating} cancel={false} stars={5} readOnly />
    </div>
  )
}

export default TutorReviews
