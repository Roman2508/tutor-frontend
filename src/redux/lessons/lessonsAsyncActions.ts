import { createAsyncThunk } from '@reduxjs/toolkit'
import { CreateOrUpdateLessonType, LessonsFilterType } from '../../api/apiTypes'
import { LoadingStatusTypes } from '../appTypes'
import { setLoadingStatus } from './lessonsSlice'
import { lessonsAPI } from '../../api/api'
import { setAppAlert } from '../appStatus/appStatusSlice'

export const getLessons = createAsyncThunk('lessons/GetLessons', async (payload: LessonsFilterType, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await lessonsAPI.getAll(payload)
    thunkAPI.dispatch(setAppAlert({ message: 'Завантажено', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
    throw error
  }
})

export const createLesson = createAsyncThunk(
  'lessons/createLesson',
  async (payload: CreateOrUpdateLessonType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

    try {
      const { data } = await lessonsAPI.create(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Додано новий урок', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
      throw error
    }
  }
)

export const updateLesson = createAsyncThunk(
  'lessons/updateLesson',
  async (payload: CreateOrUpdateLessonType, thunkAPI) => {
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await lessonsAPI.update(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Урок оновлено', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
      throw error
    }
  }
)

export const deleteLesson = createAsyncThunk('lessons/deleteLesson', async (id: number, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

  try {
    const { data } = await lessonsAPI.delete(id)
    thunkAPI.dispatch(setAppAlert({ message: 'Урок видалено', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
    throw error
  }
})
