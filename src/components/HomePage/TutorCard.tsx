import React from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Avatar } from 'primereact/avatar'
import { Rating } from 'primereact/rating'
import { CiUser as UserIcon } from 'react-icons/ci'
import { MdOutlineAddBox as AddToFavouriteIcon } from 'react-icons/md'

import styles from './HomePage.module.scss'
import { Link } from 'react-router-dom'

const TutorCard = () => {
  const [rating, setRating] = React.useState<number>(0)

  return (
    <Card className={styles.tutor}>
      <div className={styles['tutor-inner']}>
        <Link to="/tutor">
          <Avatar icon={<UserIcon size={50} color="#fff" />} className={styles.avatar} />
        </Link>

        <div className={styles['tutor-info']}>
          <div className={styles['tutor-info-top']}>
            <Link to="/tutor" style={{ textDecoration: 'none' }}>
              <h4 className={styles['tutor-name']}>Boris Johnson</h4>
            </Link>
            <AddToFavouriteIcon size={24} className={styles['add-to-favourite']} title='Додати в "Обрані"' />
          </div>

          <div>
            <span>Всього учнів: 744 </span>
            <span>з них </span>
            <span>10 активних учнів</span>
          </div>

          <p>Викладає дисципліни: Англійська мова, Польська мова, С++, Data Sciens, Machine learning</p>

          <p className={styles['tutor-info-desc']}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
            numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse,
            cupiditate neque quas!
          </p>

          <Link className={styles['tutor-link']} to="/tutor">
            Докладніше
          </Link>
        </div>

        <div className={styles['tutor-actions']}>
          <b className={styles['lesson-rating']}>Рейтинг:</b>
          <Rating
            onChange={(e) => setRating(Number(e.value))}
            style={{ justifyContent: 'center' }}
            value={rating}
            cancel={false}
            stars={5}
            readOnly
          />
          <b style={{ display: 'block', marginTop: '5px' }}>7 відгуків</b>

          <b className={styles['lesson-price-title']}>1 326</b>
          <p className={styles['lesson-price-desc']}>грн/50 хв. урок</p>

          <Button className={styles['tutor-action-button']} label="Забронювати урок" size="small" />
          <Button
            className={styles['tutor-action-button']}
            label="Надіслати повідомлення"
            severity="secondary"
            size="small"
            style={{ marginTop: '0.5em' }}
          />
        </div>
      </div>
    </Card>
  )
}

export default TutorCard
