import React from 'react'
import dayjs from 'dayjs'
import uk from 'dayjs/locale/uk'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar as CalendarComponent, dayjsLocalizer, Event, SlotInfo } from 'react-big-calendar'
import { toast } from 'react-toastify'

dayjs.locale(uk)

dayjs.extend(updateLocale)

dayjs.updateLocale('uk', {
  weekdaysShort: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
})

const localizer = dayjsLocalizer(dayjs)

export const customDayjs = dayjs

interface ICalendarProps {
  events?: Event[]
  onClick?: (e: Event) => void
  selectable?: boolean
  heigth?: string
  onSelectLessonsTime?: React.Dispatch<React.SetStateAction<Date | null>>
}

const Calendar: React.FC<ICalendarProps> = ({
  events = [],
  selectable = false,
  onClick = () => {},
  heigth = '',
  onSelectLessonsTime,
}) => {
  const calendarHeight = heigth ? heigth : selectable ? '450px' : '600px'

  const isDatesOverlap = (events: Event[], selectedDate: Event) => {
    return events.some((dateObject) => {
      // Проверяем, если начальная или конечная дата выбранной даты частично перекрывается с диапазоном текущего объекта даты
      return (
        // @ts-ignore
        (selectedDate.start <= dateObject.start && selectedDate.end >= dateObject.end) ||
        // @ts-ignore
        (selectedDate.start >= dateObject.start && selectedDate.start < dateObject.end) ||
        // @ts-ignore
        (selectedDate.end > dateObject.start && selectedDate.end <= dateObject.end)
      )
    })
  }

  React.useEffect(() => {
    return () => onSelectLessonsTime && onSelectLessonsTime(null)
  }, [])

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
          const isOverlap = isDatesOverlap(events, { start: slotInfo.start, end: slotInfo.end })

          if (!isOverlap) {
            onSelectLessonsTime && onSelectLessonsTime(slotInfo.start)
          } else {
            toast.info('Викладач зайнятий в цей час. Виберіть іншу дату')
          }
        }}
        views={['week']}
        startAccessor="start"
        endAccessor="end"
        style={{ height: calendarHeight }}
        culture={'fr'}
        messages={{
          next: 'Наступний тиждень',
          previous: 'Попередній тиждень',
          today: 'Сьогодні',
          week: 'Тиждень',
        }}
      />
    </div>
  )
}

export default Calendar
