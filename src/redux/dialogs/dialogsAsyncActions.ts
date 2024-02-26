import { createAsyncThunk } from '@reduxjs/toolkit'
import { CreateDialogType, CreateMessageType, DeleteDialogType, GetDialogsType } from '../../api/apiTypes'
import { setAppAlert } from '../appStatus/appStatusSlice'
import { setLoadingStatus } from './dialogsSlice'
import { LoadingStatusTypes } from '../appTypes'
import { dialogsAPI, messagesAPI } from '../../api/api'

export const getDialogs = createAsyncThunk('dialogs/getDialogs', async (payload: GetDialogsType, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження', status: 'info' }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await dialogsAPI.getAll(payload)
    thunkAPI.dispatch(setAppAlert({ message: 'Діалоги завантажені', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
    throw error
  }
})

export const createDialog = createAsyncThunk('dialogs/createDialog', async (payload: CreateDialogType, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження', status: 'info' }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await dialogsAPI.create(payload)
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
    throw error
  }
})

export const deleteDialog = createAsyncThunk('dialogs/deleteDialog', async (payload: DeleteDialogType, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження', status: 'info' }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await dialogsAPI.delete(payload)
    thunkAPI.dispatch(setAppAlert({ message: 'Діалог видалено', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
    throw error
  }
})

/* === messages === */

export const getMessages = createAsyncThunk('dialogs/getMessages', async (id: number, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження', status: 'info' }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await messagesAPI.getAll(id)
    thunkAPI.dispatch(setAppAlert({ message: 'Повідомлення завантажено', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
    throw error
  }
})

export const createMessage = createAsyncThunk('dialogs/createMessage', async (payload: CreateMessageType, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження', status: 'info' }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await messagesAPI.create(payload)
    thunkAPI.dispatch(setAppAlert({ message: 'Повідомлення надіслано', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
    throw error
  }
})

export const updateIsReading = createAsyncThunk('dialogs/updateIsReading', async (id: number, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження', status: 'info' }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await messagesAPI.updateIsReading(id)
    thunkAPI.dispatch(setAppAlert({ message: 'Повідомлення прочитано', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
    throw error
  }
})

export const deleteMessages = createAsyncThunk('dialogs/deleteMessages', async (id: number, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження', status: 'info' }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await messagesAPI.delete(id)
    thunkAPI.dispatch(setAppAlert({ message: 'Повідомлення видалено', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
    throw error
  }
})
