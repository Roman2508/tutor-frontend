import React from "react"
import cn from "classnames"
import { Card } from "primereact/card"
import { Link } from "react-router-dom"

import Avatar from "../ui/Avatar/Avatar"
import styles from "./LessonsPage.module.scss"

const LessonCard = () => {
  return (
    <Link to="/lesson/id" style={{ textDecoration: "none" }}>
      <Card style={{ marginBottom: "20px" }}>
        <div className={styles.wrapper}>
          <div className={styles.col}>
            <Avatar size="large" shape="square" />
          </div>

          <div className={cn(styles.col, styles["main-content"])}>
            <h4 className={styles["user-name"]}>Boris Johnson</h4>

            <p className={styles["lesson-name"]}>Англійська мова</p>
            <p className={styles["lesson-theme"]}>Unit 4 Develop your Vocabulary pp. 100</p>
          </div>

          <div className={styles.col}>
            <div className={styles["status-wrapper"]}>
              <div className={styles.badge}></div>
              <p className={styles.status}>Заплановано</p>
            </div>

            <p className={styles.date}>17.02.2024</p>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default LessonCard
