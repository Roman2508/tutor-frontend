import React from 'react'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { Rating } from 'primereact/rating'
import { Button } from 'primereact/button'
import { Event } from 'react-big-calendar'
import { useParams } from 'react-router-dom'
import { CiUser as UserIcon } from 'react-icons/ci'
import { TabView, TabPanel } from 'primereact/tabview'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Avatar as PrimeReactAvatar } from 'primereact/avatar'
import { MdOutlineAddBox as AddToFavouriteIcon } from 'react-icons/md'

import styles from './TutorPage.module.scss'
import { useAppDispatch } from '../../redux/store'
import { authSelector } from '../../redux/auth/authSlice'
import Calendar from '../../components/Calendar/Calendar'
import { TutorType } from '../../redux/tutors/tutorsTypes'
import { tutorsSelector } from '../../redux/tutors/tutorsSlice'
import TutorLesson from '../../components/TutorPage/TutorLesson'
import { getTutor } from '../../redux/tutors/tutorsAsyncActions'
import TutorReviews from '../../components/TutorPage/TutorReviews'
import AddReviewsModal from '../../components/TutorPage/AddReviewsModal'
import LoadingSpinner from '../../components/ui/LoadingSpinner/LoadingSpinner'
import { ReservedLessonType } from '../../redux/reservedLessons/reservedLessonsTypes'
import LessonModal, { ILessonFormFilds } from '../../components/TutorPage/LessonModal'

export interface ILessonModalData {
  modalType: 'create' | 'update'
  modalData: ILessonFormFilds & { id: number }
  modalVisible: boolean
}

const TutorPage = () => {
  const dispatch = useAppDispatch()

  const params = useParams()

  const { auth } = useSelector(authSelector)
  const { tutor } = useSelector(tutorsSelector)

  const [reviewsModalVisible, setReviewsModalVisible] = React.useState(false)
  const [lessonModalData, setLessonModalData] = React.useState<ILessonModalData>({
    modalVisible: false,
    modalType: 'create',
    modalData: { name: '', price: 1, duration: 20, theme: '', id: 0 },
  })

  const [calendarEvents, setCalendarEvents] = React.useState<Event[]>([])

  const onActionButtonClick = (modalData: ILessonFormFilds & { id: number }) => {
    setLessonModalData({ modalData, modalType: 'update', modalVisible: true })
  }

  const isOwner = auth?.id === Number(params.id) && auth.userRole === 'tutor'

  React.useEffect(() => {
    if (tutor) return

    if (params.id) {
      const fetchItems = async () => {
        const { payload } = await dispatch(getTutor(Number(params.id)))
        const events = (payload as TutorType).reservedLessons.map((el: ReservedLessonType) => {
          return {
            start: dayjs(el.startAt).toDate(),
            end: dayjs(el.startAt).add(el.duration, 'minute').toDate(),
          }
        })
        setCalendarEvents(events)
      }
      fetchItems()
    }
  }, [])

  if (!tutor || !auth) {
    return <LoadingSpinner />
  }

  return (
    <>
      <AddReviewsModal visible={reviewsModalVisible} setVisible={setReviewsModalVisible} />

      <LessonModal lessonModalData={lessonModalData} setLessonModalData={setLessonModalData} />

      <div className={styles.wrapper}>
        <div className={styles['left-col']}>
          <div className={styles['left-col-top']}>
            <PrimeReactAvatar
              icon={<UserIcon size={50} color="#fff" />}
              image={tutor.avatarUrl}
              className={styles.avatar}
            />

            <div>
              <div className={styles['tutor-info']}>
                <div className={styles['tutor-info-top']}>
                  <div style={{ textDecoration: 'none' }}>
                    <h4 className={styles['tutor-name']}>{tutor.name}</h4>
                  </div>
                  <AddToFavouriteIcon size={24} className={styles['add-to-favourite']} title='Додати в "Обрані"' />
                </div>

                <div>
                  <span>Всього учнів: {tutor.studentsCount}</span>
                  {!!tutor.studentsCount && (
                    <>
                      <span>з них </span>
                      <span>{Math.floor(Math.random() * tutor.studentsCount)} активних учнів</span>
                    </>
                  )}
                </div>

                <p>Викладає дисципліни: {tutor.lessons.map((el) => `${el.name}, `)}</p>

                <p className={styles['tutor-info-desc']}>{tutor.description}</p>
              </div>
            </div>
          </div>

          <div className={styles['left-col-bottom']}>
            <TabView>
              <TabPanel header="Розклад">
                <Calendar events={calendarEvents} />
              </TabPanel>

              <TabPanel header={`Відгуки (${tutor.reviews.length})`}>
                {tutor.reviews.map((el) => (
                  <TutorReviews reviews={el} key={el.id} user={{ id: auth.id, userRole: auth.userRole }} />
                ))}
              </TabPanel>
              <TabPanel header="Уроки">
                {tutor.lessons.map((lesson) => (
                  <TutorLesson
                    lesson={lesson}
                    key={lesson.id}
                    isOwner={isOwner}
                    onActionButtonClick={onActionButtonClick}
                  />
                ))}
              </TabPanel>
            </TabView>
          </div>
        </div>

        <div className={styles['right-col']}>
          <b className={styles['lesson-rating']}>Рейтинг:</b>
          <Rating style={{ justifyContent: 'center' }} value={tutor.rating} cancel={false} stars={5} readOnly />
          <b style={{ display: 'block', marginTop: '5px', marginBottom: '20px' }}>Відгуків: {tutor.reviews.length}</b>

          {!isOwner && (
            <>
              <Button
                className={styles['tutor-action-button']}
                label="Залишити відгук"
                size="small"
                onClick={() => setReviewsModalVisible(true)}
              />

              <Button
                className={styles['tutor-action-button']}
                label="Надіслати повідомлення"
                severity="secondary"
                size="small"
                style={{ marginTop: '0.7em' }}
              />
            </>
          )}

          {isOwner && (
            <Button
              className={styles['tutor-action-button']}
              label="Створити новий урок"
              size="small"
              style={{ marginTop: '0.7em' }}
              onClick={() => setLessonModalData((prev) => ({ ...prev, modalVisible: true }))}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default TutorPage
