import { LoadingStatusTypes } from '../appTypes'

export type InitialStateType = {
  lessons: LessonType[] | null
  loadingStatus: LoadingStatusTypes
}

export type LessonType = {
  id: number
  name: string
  price: number
  tutor: {
    id: number
    name: string
  }
  duration: number
  createdAt: Date
}
