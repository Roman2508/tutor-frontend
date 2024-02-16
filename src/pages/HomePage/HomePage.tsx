import React from 'react'
import { Button } from 'primereact/button'

import styles from './HomePage.module.scss'
import TutorFilter from '../../components/HomePage/TutorFilter'
import TutorCard from '../../components/HomePage/TutorCard'

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.tutors}>
          {Array(12)
            .fill(null)
            .map((_, index) => (
              <TutorCard key={index} />
            ))}
        </div>

        <TutorFilter />
      </div>

      <Button label="Button" style={{ marginRight: '10px', width: '200px' }} raised={false} />
      <Button label="Info" severity="info" />
    </div>
  )
}

export default HomePage
