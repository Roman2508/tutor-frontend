import React from "react"
// import dayjs from "dayjs"
// import uk from "dayjs/locale/uk"
import { Avatar } from "primereact/avatar"
import { Rating } from "primereact/rating"
import { Button } from "primereact/button"
import { CiUser as UserIcon } from "react-icons/ci"
// import updateLocale from "dayjs/plugin/updateLocale"
import { TabView, TabPanel } from "primereact/tabview"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { /* Calendar, dayjsLocalizer, */ Event } from "react-big-calendar"
import { MdOutlineAddBox as AddToFavouriteIcon } from "react-icons/md"
import Calendar from "../../components/Calendar/Calendar"
import styles from "./TutorPage.module.scss"
import TutorReviews from "../../components/TutorPage/TutorReviews"
import AddReviewsModal from "../../components/TutorPage/AddReviewsModal"

// dayjs.locale(uk)

// dayjs.extend(updateLocale)

// dayjs.updateLocale("uk", {
//   weekdaysShort: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
// })

// const localizer = dayjsLocalizer(dayjs)

const TutorPage = () => {
  // const s = new Date(2024, 2, 16, 12, 0)
  // const e = new Date(2024, 2, 16, 13, 0)

  const [visible, setVisible] = React.useState(false)
  const [rating, setRating] = React.useState(0)
  const [events, setEvents] = React.useState<Event[]>([
    // {
    //   title: "Learn cool stuff",
    //   start: dayjs(s),
    //   end: dayjs(e),
    // },
  ])

  // console.log(dayjs("02 16, 2024 12:00").format("MM D, YYYY h:mm"))
  // console.log(dayjs(s))

  return (
    <>
      <AddReviewsModal visible={visible} setVisible={setVisible} />

      <div className={styles.wrapper}>
        <div className={styles["left-col"]}>
          <div className={styles["left-col-top"]}>
            <Avatar icon={<UserIcon size={50} color="#fff" />} className={styles.avatar} />

            <div>
              <div className={styles["tutor-info"]}>
                <div className={styles["tutor-info-top"]}>
                  <div style={{ textDecoration: "none" }}>
                    <h4 className={styles["tutor-name"]}>Boris Johnson</h4>
                  </div>
                  <AddToFavouriteIcon
                    size={24}
                    className={styles["add-to-favourite"]}
                    title='Додати в "Обрані"'
                  />
                </div>

                <div>
                  <span>Всього учнів: 744 </span>
                  <span>з них </span>
                  <span>10 активних учнів</span>
                </div>

                <p>
                  Викладає дисципліни: Англійська мова, Польська мова, С++, Data Sciens, Machine
                  learning
                </p>

                <p className={styles["tutor-info-desc"]}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed
                  consequuntur error repudiandae numquam deserunt quisquam repellat libero
                  asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                  quas!
                </p>
              </div>
            </div>
          </div>

          <div className={styles["left-col-bottom"]}>
            <TabView>
              <TabPanel header="Розклад">
                <Calendar />
                {/* <div>
                  <Calendar
                    localizer={localizer}
                    events={events}
                    defaultView="week"
                    views={["week"]}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    culture={"fr"}
                    messages={{
                      next: "Наступний тиждень",
                      previous: "Попередній тиждень",
                      today: "Сьогодні",
                      week: "Тиждень",
                    }}
                  />
                </div> */}
              </TabPanel>

              <TabPanel header="Відгуки (36)">
                <TutorReviews />
                <TutorReviews />
                <TutorReviews />
                <TutorReviews />
                <TutorReviews />
              </TabPanel>
              <TabPanel header="Курси"></TabPanel>
            </TabView>
          </div>
        </div>

        <div className={styles["right-col"]}>
          <b className={styles["lesson-rating"]}>Рейтинг:</b>
          <Rating
            onChange={(e) => setRating(Number(e.value))}
            style={{ justifyContent: "center" }}
            value={rating}
            cancel={false}
            stars={5}
            readOnly
          />
          <b style={{ display: "block", marginTop: "5px" }}>7 відгуків</b>

          <b className={styles["lesson-price-title"]}>1 326</b>
          <p className={styles["lesson-price-desc"]}>грн/50 хв. урок</p>

          <Button
            className={styles["tutor-action-button"]}
            label="Залишити відгук"
            size="small"
            onClick={() => setVisible(true)}
          />
          <Button
            className={styles["tutor-action-button"]}
            label="Надіслати повідомлення"
            severity="secondary"
            size="small"
            style={{ marginTop: "0.7em" }}
          />
        </div>
      </div>
    </>
  )
}

export default TutorPage
