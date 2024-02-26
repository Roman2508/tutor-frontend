import { LoadingStatusTypes } from '../appTypes'

export type InitialStateType = {
  reservedLessons: ReservedLessonType[] | null
  fullLesson: ReservedLessonType | null
  loadingStatus: LoadingStatusTypes
}

export type ReservedLessonType = {
  id: number
  name: string
  theme: string | null
  price: number
  tutor: {
    id: number
    name: string
  }
  student: {
    id: number
    name: string
  }
  status: 'planned' | 'conducted'
  duration: number
  files: FileType[]
  meetUrl: string
  startAt: Date
  createdAt: Date
}

export type FileType = {
  id: number
  filename: string
  size: number
  mimetype: string
  lesson: {
    id: number
    name: string
  }
  authorRole: 'tutor' | 'student'
  createdAt: Date
}
