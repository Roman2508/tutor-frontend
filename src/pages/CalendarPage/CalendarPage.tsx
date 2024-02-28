import React from "react"
import dayjs from "dayjs"
import cn from "classnames"
import { Card } from "primereact/card"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Button } from "primereact/button"
import { Event } from "react-big-calendar"

import styles from "./CalendarPage.module.scss"
import { useAppDispatch } from "../../redux/store"
import Avatar from "../../components/ui/Avatar/Avatar"
import Calendar from "../../components/Calendar/Calendar"
import { GetResevedLessonsResponceType } from "../../api/apiTypes"
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner"
import { filterInititalState } from "../ReservedLessonsPage/ReservedLessonsPage"
import { ReservedLessonType } from "../../redux/reservedLessons/reservedLessonsTypes"
import { reservedLessonsSelector } from "../../redux/reservedLessons/reservedLessonsSlice"
import { getReservedLessons } from "../../redux/reservedLessons/reservedLessonsAsyncActions"
import { authSelector } from "../../redux/auth/authSlice"

const CalendarPage = () => {
  const dispatch = useAppDispatch()

  const { auth } = useSelector(authSelector)
  const { reservedLessons } = useSelector(reservedLessonsSelector)

  const [events, setEvents] = React.useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = React.useState<ReservedLessonType | null>(null)

  const onSelectEvent = (e: Event) => {
    if (!reservedLessons) return
    const lesson = reservedLessons.find((el) => {
      return (
        dayjs(el.startAt).format("YYYY.MM.DD - hh:mm") ===
        dayjs(e.start).format("YYYY.MM.DD - hh:mm")
      )
    })
    if (lesson) setSelectedEvent(lesson)
  }

  React.useEffect(() => {
    if (!events) return

    const fetchData = async () => {
      const { student, tutor, ...rest } = filterInititalState
      const { payload } = await dispatch(getReservedLessons({ ...rest, pageSize: 1000 }))
      const events = (payload as GetResevedLessonsResponceType).entities.map(
        (el: ReservedLessonType) => {
          return {
            title: el.name,
            start: dayjs(el.startAt).toDate(),
            end: dayjs(el.startAt).add(el.duration, "minute").toDate(),
          }
        }
      )

      setEvents(events)
    }

    fetchData()
  }, [])

  if (!auth) {
    return <LoadingSpinner />
  }

  return (
    <div className={styles.container}>
      <Card className={styles["calendar-wrapper"]}>
        {events.length ? (
          <Calendar events={events} onClick={onSelectEvent} />
        ) : (
          <div>
            <LoadingSpinner />
          </div>
        )}
      </Card>

      <Card className={styles["lesson-info"]}>
        {selectedEvent ? (
          <div className={styles.wrapper}>
            <div className={styles.top}>
              <Avatar size="small" shape="square" src={selectedEvent[auth.userRole].avatarUrl} />
              <h4 className={styles["user-name"]}>{selectedEvent[auth.userRole].name}</h4>
            </div>

            <div className={cn(styles["main-content"])}>
              <p className={styles["lesson-name"]}>{selectedEvent.name}</p>
              <p className={styles["lesson-theme"]}>{selectedEvent.theme}</p>
            </div>

            <div className={styles["status-wrapper"]}>
              <div className={styles.badge}></div>
              <p className={styles.status}>{selectedEvent.status}</p>
            </div>

            <p className={styles.date}>
              {dayjs(selectedEvent.startAt).format("hh:mm")} -{" "}
              {dayjs(selectedEvent.startAt).add(selectedEvent.duration, "minute").format("hh:mm")}
            </p>

            {selectedEvent.meetUrl && (
              <a className={styles.link} href={selectedEvent.meetUrl} target="_blank">
                <Button
                  label="Посилання на онлайн-урок"
                  style={{ width: "100%", marginTop: "20px" }}
                  outlined
                />
              </a>
            )}

            <Link to="/lesson/1">
              <Button
                label="Детальна інформація про урок"
                style={{ width: "100%", marginTop: "10px" }}
              />
            </Link>
          </div>
        ) : (
          <h3 style={{ textAlign: "center" }}>Виберіть урок</h3>
        )}
      </Card>
    </div>
  )
}

export default CalendarPage
