import React from "react"
import cn from "classnames"

import styles from "./CalendarPage.module.scss"
import Calendar from "../../components/Calendar/Calendar"
import { Card } from "primereact/card"
import Avatar from "../../components/ui/Avatar/Avatar"
import { Button } from "primereact/button"
import { Link } from "react-router-dom"

const CalendarPage = () => {
  return (
    <div className={styles.container}>
      <Card className={styles["calendar-wrapper"]}>
        <Calendar />
      </Card>

      <Card className={styles["lesson-info"]}>
        <div className={styles.wrapper}>
          <div className={styles.top}>
            <Avatar size="small" shape="square" />
            <h4 className={styles["user-name"]}>Boris Johnson</h4>
          </div>

          <div className={cn(styles["main-content"])}>
            <p className={styles["lesson-name"]}>Англійська мова</p>
            <p className={styles["lesson-theme"]}>Unit 4 Develop your Vocabulary pp. 100</p>
          </div>

          <div className={styles["status-wrapper"]}>
            <div className={styles.badge}></div>
            <p className={styles.status}>Заплановано</p>
          </div>

          <p className={styles.date}>17.02.2024</p>

          <a className={styles.link} href="https://meet.google.com/uge-cwpv-aug" target="_blank">
            <Button
              label="Посилання на онлайн-урок"
              style={{ width: "100%", marginTop: "20px" }}
              outlined
            />
          </a>

          <Link to="/lesson/1">
            <Button
              label="Детальна інформація про урок"
              style={{ width: "100%", marginTop: "10px" }}
            />
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default CalendarPage
