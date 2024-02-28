import React from "react"
import dayjs from "dayjs"
import uk from "dayjs/locale/uk"
import updateLocale from "dayjs/plugin/updateLocale"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar as CalendarComponent, dayjsLocalizer, Event } from "react-big-calendar"

dayjs.locale(uk)

dayjs.extend(updateLocale)

dayjs.updateLocale("uk", {
  weekdaysShort: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
})

const localizer = dayjsLocalizer(dayjs)

interface ICalendarProps {
  events?: Event[]
  onClick?: (e: Event) => void
}

const Calendar: React.FC<ICalendarProps> = ({ events = [], onClick = () => {} }) => {
  return (
    <div>
      <CalendarComponent
        onSelectEvent={onClick}
        onDoubleClickEvent={onClick}
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
    </div>
  )
}

export default Calendar
