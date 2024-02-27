import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthLoginType, AuthMeType, AuthRegisterType, UpdateStudentType, UpdateTutorType } from '../../api/apiTypes'
import { setLoadingStatus } from '../lessons/lessonsSlice'
import { LoadingStatusTypes } from '../appTypes'
import { authAPI } from '../../api/api'
import { setAppAlert } from '../appStatus/appStatusSlice'
import { AuthType } from './authTypes'

export const authLogin = createAsyncThunk('auth/authLogin', async (payload: AuthLoginType, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження', status: 'info' }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await authAPI.login(payload)
    thunkAPI.dispatch(setAppAlert({ message: 'Авторизований', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    window.localStorage.setItem('tutor-token', data.accessToken)
    return data
  } catch (error) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
    throw error
  }
})

export const authRegister = createAsyncThunk('auth/authRegister', async (payload: AuthRegisterType, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження', status: 'info' }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await authAPI.register(payload)
    thunkAPI.dispatch(setAppAlert({ message: 'Авторизований', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
    throw error
  }
})

export const authMe = createAsyncThunk('auth/authMe', async (payload: AuthMeType, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження', status: 'info' }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await authAPI.getMe(payload)
    thunkAPI.dispatch(setAppAlert({ message: 'Авторизований', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error) {
    console.log(1)
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
    throw error
  }
})

export const updateTutor = createAsyncThunk('auth/updateTutor', async (payload: UpdateTutorType, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження', status: 'info' }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await authAPI.updateTutor(payload)
    thunkAPI.dispatch(setAppAlert({ message: 'Оновлено', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error) {
    console.log(1)
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
    throw error
  }
})

export const updateStudent = createAsyncThunk('auth/updateStudent', async (payload: UpdateStudentType, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження', status: 'info' }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await authAPI.updateStudent(payload)
    thunkAPI.dispatch(setAppAlert({ message: 'Оновлено', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error) {
    console.log(1)
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
    throw error
  }
})
