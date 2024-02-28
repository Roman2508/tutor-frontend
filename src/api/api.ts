import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import {
  AuthMeType,
  AuthLoginType,
  GetDialogsType,
  AuthRegisterType,
  CreateDialogType,
  CreateMessageType,
  CreateReviewsType,
  LessonsFilterType,
  ReservedLessonsFilterType,
  UpdateReservedLessonsType,
  CreateReservedLessonsType,
  CreateLessonType,
  UpdateLessonType,
  GetLessonsResponce,
  UpdateTutorType,
  UpdateStudentType,
  AuthResponceType,
  GetResevedLessonsResponceType,
} from './apiTypes'
import { AuthType } from '../redux/auth/authTypes'
import { LessonType } from '../redux/lessons/lessonsType'
import { DialogType } from '../redux/dialogs/dialogsTypes'
import { ReviewsType, TutorType } from '../redux/tutors/tutorsTypes'
import { ReservedLessonType } from '../redux/reservedLessons/reservedLessonsTypes'

const instanse = axios.create({
  baseURL: 'http://localhost:7777/',
})

// Якщо є токен, вшиваю його в конфігурацію axios
// @ts-ignore
instanse.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = window.localStorage.getItem('tutor-token')

  if (config.headers && token) {
    config.headers.Authorization = String(`Bearer ${token}`)
    // config.headers.Authorization = String(window.localStorage.getItem('token'))
  }

  return config
})

export const authAPI = {
  login(payload: AuthLoginType) {
    return instanse.post<AuthResponceType>('/auth/login', payload)
  },
  register(payload: AuthRegisterType) {
    return instanse.post<AuthResponceType>('/auth/register', payload)
  },
  getMe(payload: AuthMeType) {
    return instanse.post<AuthType>('/auth/me', payload)
  },

  updateTutor(payload: UpdateTutorType) {
    const { id, ...data } = payload
    return instanse.patch(`/tutors/${id}`, data)
  },
  updateStudent(payload: UpdateStudentType) {
    const { id, ...data } = payload
    return instanse.patch(`/student/${id}`, data)
  },
}

export const lessonsAPI = {
  getAll(payload: LessonsFilterType) {
    return instanse.post<GetLessonsResponce>('/lessons/get', payload)
  },
  create(payload: CreateLessonType) {
    return instanse.post<LessonType>('/lessons', payload)
  },
  update(payload: UpdateLessonType) {
    const { id, ...rest } = payload
    return instanse.patch<LessonType>(`/lessons/${id}`, rest)
  },
  delete(id: number) {
    return instanse.delete<number>(`/lessons/${id}`)
  },
}

export const tutorsAPI = {
  getById(id: number) {
    return instanse.get<TutorType>(`/tutors/${id}`)
  },
}

export const dialogsAPI = {
  getAll(payload: GetDialogsType) {
    const { id, userRole } = payload
    return instanse.get<DialogType[]>(`/tutors/${id}/${userRole}`)
  },
  create(payload: CreateDialogType) {
    return instanse.post<DialogType>(`/tutors`, payload)
  },
  delete(payload: GetDialogsType) {
    const { id, userRole } = payload
    return instanse.delete<number>(`/tutors/${id}/${userRole}`)
  },
}

export const messagesAPI = {
  getAll(id: number) {
    return instanse.get(`/messages/${id}`)
  },
  create(payload: CreateMessageType) {
    return instanse.post('/messages', payload)
  },
  updateIsReading(id: number) {
    return instanse.patch(`/messages/${id}`)
  },
  delete(id: number) {
    return instanse.delete(`/messages/${id}`)
  },
}

export const reviewsAPI = {
  async create(payload: CreateReviewsType) {
    return instanse.post<ReviewsType>('/reviews', payload)
  },
  remove(id: number) {
    return instanse.delete<number>(`/reviews/${id}`)
  },
}

export const reservedLessonsAPI = {
  getAll(payload: ReservedLessonsFilterType) {
    return instanse.post<GetResevedLessonsResponceType>('/reserved-lessons/get', payload)
  },
  getOneById(id: number) {
    return instanse.get<ReservedLessonType>(`/reserved-lessons/${id}`)
  },
  create(payload: CreateReservedLessonsType) {
    return instanse.post<ReservedLessonType>('/reserved-lessons', payload)
  },
  update(payload: UpdateReservedLessonsType) {
    const { id, ...data } = payload
    return instanse.patch<ReservedLessonType>(`/reserved-lessons/${id}`, data)
  },
  delete(id: number) {
    return instanse.delete<number>(`/reserved-lessons/${id}`)
  },
}
