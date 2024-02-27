import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import lessonsSlice from './lessons/lessonsSlice'
import appStatusSlice from './appStatus/appStatusSlice'
import dialogsSlice from './dialogs/dialogsSlice'
import reservedLessonsSlice from './reservedLessons/reservedLessonsSlice'
import tutorsSlice from './tutors/tutorsSlice'
import authSlice from './auth/authSlice'

export const store = configureStore({
  reducer: {
    appStatus: appStatusSlice,
    lessons: lessonsSlice,
    dialogs: dialogsSlice,
    reservedLessons: reservedLessonsSlice,
    tutors: tutorsSlice,
    auth: authSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
