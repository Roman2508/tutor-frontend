import React from 'react'
import { Avatar } from 'primereact/avatar'
import { Rating } from 'primereact/rating'
import { Button } from 'primereact/button'
import { CiUser as UserIcon } from 'react-icons/ci'
import { TabView, TabPanel } from 'primereact/tabview'
import { MdOutlineAddBox as AddToFavouriteIcon } from 'react-icons/md'

import styles from './TutorPage.module.scss'
import TutorReviews from '../../components/TutorPage/TutorReviews'

const TutorPage = () => {
  const [rating, setRating] = React.useState(0)

  return (
    <div className={styles.wrapper}>
      <div className={styles['left-col']}>
        <div className={styles['left-col-top']}>
          <Avatar icon={<UserIcon size={50} color="#fff" />} className={styles.avatar} />

          <div>
            <div className={styles['tutor-info']}>
              <div className={styles['tutor-info-top']}>
                <div style={{ textDecoration: 'none' }}>
                  <h4 className={styles['tutor-name']}>Boris Johnson</h4>
                </div>
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
                numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis
                esse, cupiditate neque quas!
              </p>
            </div>
          </div>
        </div>

        <div className={styles['left-col-bottom']}>
          <TabView>
            <TabPanel header="Розклад"></TabPanel>
            <TabPanel header="Відгуки (36)">
              <TutorReviews />
            </TabPanel>
            <TabPanel header="Курси"></TabPanel>
          </TabView>
        </div>
      </div>

      <div className={styles['right-col']}>
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

        {/* <Button className={styles['tutor-action-button']} label="Забронювати урок" size="small" /> */}
        <Button
          className={styles['tutor-action-button']}
          label="Надіслати повідомлення"
          severity="secondary"
          size="small"
          //   style={{ marginTop: '0.5em' }}
        />
      </div>
    </div>
  )
}

export default TutorPage
