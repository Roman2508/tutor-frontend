import React from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

import { reservedLessonsAPI } from '../../api/api'
import { useAppDispatch } from '../../redux/store'
import { authSelector } from '../../redux/auth/authSlice'
import { TutorType } from '../../redux/tutors/tutorsTypes'
import { LessonType } from '../../redux/lessons/lessonsType'
import Calendar, { customDayjs } from '../Calendar/Calendar'
import { getTutor } from '../../redux/tutors/tutorsAsyncActions'
import { ReservedLessonType } from '../../redux/reservedLessons/reservedLessonsTypes'

interface ICreateReservedLessonModalProps {
  visible: boolean
  selectedLesson: LessonType | null
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateReservedLessonModal: React.FC<ICreateReservedLessonModalProps> = ({
  visible,
  setVisible,
  selectedLesson,
}) => {
  const dispatch = useAppDispatch()

  const { auth } = useSelector(authSelector)

  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null)
  const [calendarEvents, setCalendarEvents] = React.useState<{ start: Date; end: Date }[]>([])

  const onBookLessons = async () => {
    if (!selectedLesson || !selectedTime || !auth) return

    const confirmMessage = `Початок уроку: ${customDayjs(selectedTime).format(
      'DD.MM.YYYY - HH:mm'
    )}. Тривалість уроку: ${selectedLesson.duration} хв.
    Ви дійсно хочете забронювати урок?`

    if (window.confirm(confirmMessage)) {
      try {
        toast.info('Завантаження...')
        const payload = {
          name: selectedLesson.name,
          theme: '',
          price: selectedLesson.price,
          status: 'planned' as 'planned',
          duration: selectedLesson.duration,
          startAt: selectedTime,
          tutor: selectedLesson.tutor.id,
          student: auth.id,
        }
        const { data } = await reservedLessonsAPI.payment(payload)
        if (data.response.checkout_url) {
          window.open(data.response.checkout_url, '_blank')
        } else {
          toast.error('Щось трапилось з платіжним сервісом. Спробуйте будь-ласка пізніше.')
        }
      } catch (error) {
        toast.error('Щось трапилось з платіжним сервісом. Спробуйте будь-ласка пізніше.')
        console.error(error)
      }
      setVisible(false)
    }
  }

  React.useEffect(() => {
    if (!selectedLesson) return
    const fetchItems = async () => {
      const { payload } = await dispatch(getTutor(Number(selectedLesson.tutor.id)))
      const events = (payload as TutorType).reservedLessons.map((el: ReservedLessonType) => {
        return {
          start: customDayjs(el.startAt).toDate(),
          end: customDayjs(el.startAt).add(el.duration, 'minute').toDate(),
        }
      })
      setCalendarEvents(events)
    }
    fetchItems()
  }, [selectedLesson])

  if (!selectedLesson) return

  return (
    <Dialog
      header={'Виберіть зручний час для уроку'}
      style={{ width: '80vw' }}
      visible={visible}
      onHide={() => setVisible(false)}
    >
      {!selectedTime ? (
        <p>Дли вибору виділіть потрібний час на календарі</p>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>
            Початок уроку: <b>{customDayjs(selectedTime).format('DD.MM.YYYY - HH:mm')}</b>. Тривалість уроку:{' '}
            <b>{selectedLesson.duration} хв.</b>
          </p>
          <Button onClick={onBookLessons}>Підтвердити</Button>
        </div>
      )}
      <Calendar
        selectable
        events={calendarEvents}
        onSelectLessonsTime={setSelectedTime}
      />
    </Dialog>
  )
}

export default CreateReservedLessonModal
