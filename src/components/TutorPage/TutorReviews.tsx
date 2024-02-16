import React from "react"
import { Rating } from "primereact/rating"

import Avatar from "../ui/Avatar/Avatar"
import styles from "./TutorPage.module.scss"

const TutorReviews = () => {
  const [rating, setRating] = React.useState(0)

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <Avatar size="small" />
        <div className={styles.info}>
          <h6 className={styles.name}>Student Name</h6>
          <span className={styles["created-at"]}>січень 12, 2024</span>
        </div>
      </div>

      <Rating
        onChange={(e) => setRating(Number(e.value))}
        value={rating}
        cancel={false}
        stars={5}
        readOnly
      />

      <p className={styles.comment}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam voluptas doloribus quisquam
        alias laborum facilis a mollitia, laboriosam libero, aut dignissimos unde eveniet suscipit
        placeat nam blanditiis, amet autem minima! Corporis, consectetur quibusdam ea numquam
        laboriosam eligendi impedit aliquam voluptatum vel distinctio?
      </p>
    </div>
  )
}

export default TutorReviews
