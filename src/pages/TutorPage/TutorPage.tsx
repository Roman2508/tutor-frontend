import React from 'react'
import { MdEdit } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Rating } from 'primereact/rating'
import { Button } from 'primereact/button'
import { Event } from 'react-big-calendar'
import { useParams } from 'react-router-dom'
import { FaRegBookmark } from 'react-icons/fa'
import { CiUser as UserIcon } from 'react-icons/ci'
import { TabView, TabPanel } from 'primereact/tabview'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Avatar as PrimeReactAvatar } from 'primereact/avatar'
import { MdOutlineAddBox as AddToFavouriteIcon } from 'react-icons/md'

import styles from './TutorPage.module.scss'
import { useAppDispatch } from '../../redux/store'
import Avatar from '../../components/ui/Avatar/Avatar'
import { authSelector } from '../../redux/auth/authSlice'
import Calendar from '../../components/Calendar/Calendar'
import { tutorsSelector } from '../../redux/tutors/tutorsSlice'
import LessonModal, { ILessonFormFilds } from '../../components/TutorPage/LessonModal'
import { getTutor } from '../../redux/tutors/tutorsAsyncActions'
import TutorReviews from '../../components/TutorPage/TutorReviews'
import AddReviewsModal from '../../components/TutorPage/AddReviewsModal'
import LoadingSpinner from '../../components/ui/LoadingSpinner/LoadingSpinner'
import TutorLesson from '../../components/TutorPage/TutorLesson'

// dayjs.locale(uk)

// dayjs.extend(updateLocale)

// dayjs.updateLocale("uk", {
//   weekdaysShort: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
// })

// const localizer = dayjsLocalizer(dayjs)

export interface ILessonModalData {
  modalType: 'create' | 'update'
  modalData: ILessonFormFilds & { id: number }
  modalVisible: boolean
}

const TutorPage = () => {
  // const s = new Date(2024, 2, 16, 12, 0)
  // const e = new Date(2024, 2, 16, 13, 0)

  const dispatch = useAppDispatch()

  const params = useParams()

  const { tutor } = useSelector(tutorsSelector)
  const { auth } = useSelector(authSelector)

  const [reviewsModalVisible, setReviewsModalVisible] = React.useState(false)
  const [rating, setRating] = React.useState(0)

  const [lessonModalData, setLessonModalData] = React.useState<ILessonModalData>({
    modalVisible: false,
    modalType: 'create',
    modalData: { name: '', price: 1, duration: 20, theme: '', id: 0 },
  })

  const [events, setEvents] = React.useState<Event[]>([
    // {
    //   title: "Learn cool stuff",
    //   start: dayjs(s),
    //   end: dayjs(e),
    // },
  ])

  const onActionButtonClick = (modalData: ILessonFormFilds & { id: number }) => {
    setLessonModalData({ modalData, modalType: 'update', modalVisible: true })
  }

  const isOwner = auth?.id === Number(params.id) && auth.userRole === 'tutor'

  // console.log(dayjs("02 16, 2024 12:00").format("MM D, YYYY h:mm"))
  // console.log(dayjs(s))

  React.useEffect(() => {
    if (tutor) return

    if (params.id) {
      dispatch(getTutor(Number(params.id)))
    }
  }, [])

  if (!tutor) {
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
                <Calendar />
              </TabPanel>

              <TabPanel header={`Відгуки (${tutor.reviews.length})`}>
                {tutor.reviews.map((el) => (
                  <TutorReviews reviews={el} key={el.id} />
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
          <Rating
            onChange={(e) => setRating(Number(e.value))}
            style={{ justifyContent: 'center' }}
            value={tutor.rating}
            cancel={false}
            stars={5}
            readOnly
          />
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
