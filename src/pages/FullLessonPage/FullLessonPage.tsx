import React from 'react'
import dayjs from 'dayjs'
import cn from 'classnames'
import { Card } from 'primereact/card'
import { useSelector } from 'react-redux'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { useParams } from 'react-router-dom'

import styles from './FullLessonPage.module.scss'
import { useAppDispatch } from '../../redux/store'
import File from '../../components/LessonsPage/File'
import Avatar from '../../components/ui/Avatar/Avatar'
import EmptyImage from '../../../public/empty-image.png'
import UploadFile from '../../components/LessonsPage/UploadFile'
import LoadingSpinner from '../../components/ui/LoadingSpinner/LoadingSpinner'
import { reservedLessonsSelector } from '../../redux/reservedLessons/reservedLessonsSlice'
import { getReservedLessonById } from '../../redux/reservedLessons/reservedLessonsAsyncActions'
import { FileType, ReservedLessonType } from '../../redux/reservedLessons/reservedLessonsTypes'

const FullLessonPage = () => {
  const params = useParams()

  const dispatch = useAppDispatch()

  const { fullLesson } = useSelector(reservedLessonsSelector)
  const [tutorFiles, setTutorFiles] = React.useState<FileType[]>([])
  const [studentFiles, setStudentFiles] = React.useState<FileType[]>([])

  React.useEffect(() => {
    if (!params.id) return
    const fetchData = async () => {
      const { payload } = await dispatch(getReservedLessonById(Number(params.id)))
      const tutorFiles: FileType[] = []
      const studentFiles: FileType[] = []

      const files = (payload as ReservedLessonType).files

      files.forEach((file) => {
        if (file.authorRole === 'tutor') {
          tutorFiles.push(file)
        } else {
          studentFiles.push(file)
        }
      })

      setTutorFiles(tutorFiles)
      setStudentFiles(studentFiles)
    }

    fetchData()
  }, [])

  if (!fullLesson || !params.id) {
    return <LoadingSpinner />
  }

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.wrapper}>
          <div className={styles.col}>
            <Avatar size="large" shape="square" />
          </div>

          <div className={cn(styles.col, styles['main-content'])}>
            <h4 className={styles['user-name']}>{fullLesson.tutor.name}</h4>

            <p className={styles['lesson-name']}>{fullLesson.name}</p>
            <p className={styles['lesson-theme']}>{fullLesson.theme}</p>
          </div>

          <div className={styles.col}>
            <div className={styles.s}>
              <div className={styles['status-wrapper']}>
                <div
                  className={cn(styles.badge, {
                    [styles.planned]: fullLesson.status === 'planned',
                    [styles.conducted]: fullLesson.status === 'conducted',
                  })}
                ></div>
                <p className={styles.status}>{fullLesson.status === 'planned' ? 'Заплановано' : 'Проведено'}</p>
              </div>

              <p className={styles.date}>{dayjs(fullLesson.startAt).format('hh:mm - DD.MM.YYYY')}</p>
            </div>

            {fullLesson.meetUrl && (
              <a className={styles.link} href={fullLesson.meetUrl} target="_blank">
                <Button label="Посилання на онлайн-урок" outlined />
              </a>
            )}
          </div>
        </div>

        <Divider />

        <h4 className={styles['files-title']}>Завдання:</h4>
        <div className={styles.files}>
          {tutorFiles.length ? (
            tutorFiles.map((el) => <File file={el} key={el.id} />)
          ) : (
            <div style={{ textAlign: 'center', width: '100%' }}>
              <img alt="empty image" src={EmptyImage} width={100} />
              <h5 style={{ margin: 0 }}>Файли не завантажені</h5>
            </div>
          )}
        </div>

        <Divider />

        <h4 className={styles['files-title']}>Ваші роботи:</h4>
        <div className={styles.files}>
          {studentFiles.length ? (
            studentFiles.map((el) => <File file={el} key={el.id} />)
          ) : (
            <div style={{ textAlign: 'center', width: '100%' }}>
              <img alt="empty image" src={EmptyImage} width={100} />
              <h5 style={{ margin: 0 }}>Файли не завантажені</h5>
            </div>
          )}
        </div>

        <Divider />

        <UploadFile lessonId={Number(params.id)} />
      </Card>
    </div>
  )
}

export default FullLessonPage
