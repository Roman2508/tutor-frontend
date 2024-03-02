import React from "react"
import dayjs from "dayjs"
import uk from "dayjs/locale/uk"
import updateLocale from "dayjs/plugin/updateLocale"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar as CalendarComponent, dayjsLocalizer, Event, SlotInfo } from "react-big-calendar"

dayjs.locale(uk)

dayjs.extend(updateLocale)

dayjs.updateLocale("uk", {
  weekdaysShort: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
})

const localizer = dayjsLocalizer(dayjs)

export const customDayjs = dayjs

interface ICalendarProps {
  events?: Event[]
  onClick?: (e: Event) => void
  selectable?: boolean
  onSelectLessonsTime?: React.Dispatch<React.SetStateAction<Date | null>>
}

const Calendar: React.FC<ICalendarProps> = ({
  events = [],
  selectable = false,
  onClick = () => {},
  onSelectLessonsTime,
}) => {
  return (
    <div>
      <CalendarComponent
        selectable={selectable}
        onSelectEvent={onClick}
        onDoubleClickEvent={onClick}
        localizer={localizer}
        events={events}
        defaultView="week"
        onSelectSlot={(slotInfo: SlotInfo) => {
          onSelectLessonsTime && onSelectLessonsTime(slotInfo.start)
        }}
        views={["week"]}
        startAccessor="start"
        endAccessor="end"
        style={selectable ? { height: 450 } : { height: 600 }}
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
