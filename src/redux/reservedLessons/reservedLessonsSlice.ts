import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { RootState } from "../store"
import { LoadingStatusTypes } from "../appTypes"
import { InitialStateType, ReservedLessonType } from "./reservedLessonsTypes"
import {
  createReservedLesson,
  deleteReservedLesson,
  getReservedLessonById,
  getReservedLessons,
  updateReservedLesson,
} from "./reservedLessonsAsyncActions"
import { GetResevedLessonsResponceType } from "../../api/apiTypes"

const reservedLessonsInitialState: InitialStateType = {
  reservedLessons: null,
  fullLesson: null,
  loadingStatus: LoadingStatusTypes.NEVER,
}

const reservedLessonsSlice = createSlice({
  name: "reservedLessons",
  initialState: reservedLessonsInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },
  },
  extraReducers: (builder) => {
    /* getReservedLessons */
    builder.addCase(
      getReservedLessons.fulfilled,
      (state, action: PayloadAction<GetResevedLessonsResponceType>) => {
        state.reservedLessons = action.payload.entities
        state.loadingStatus = LoadingStatusTypes.SUCCESS
      }
    )

    /* getReservedLessonById */
    builder.addCase(
      getReservedLessonById.fulfilled,
      (state, action: PayloadAction<ReservedLessonType>) => {
        state.fullLesson = action.payload
        state.loadingStatus = LoadingStatusTypes.SUCCESS
      }
    )

    /* createReservedLesson */
    builder.addCase(
      createReservedLesson.fulfilled,
      (state, action: PayloadAction<ReservedLessonType>) => {
        if (!state.reservedLessons) return
        state.reservedLessons.push(action.payload)
        state.loadingStatus = LoadingStatusTypes.SUCCESS
      }
    )

    /* updateReservedLesson */
    builder.addCase(
      updateReservedLesson.fulfilled,
      (state, action: PayloadAction<ReservedLessonType>) => {
        if (!state.reservedLessons) return
        const reservedLessons = state.reservedLessons.map((el) => {
          if (el.id === action.payload.id) {
            return { ...el, ...action.payload }
          }
          return el
        })
        state.reservedLessons = reservedLessons
        state.loadingStatus = LoadingStatusTypes.SUCCESS
      }
    )

    /* deleteReservedLesson */
    builder.addCase(deleteReservedLesson.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.reservedLessons) return
      const reservedLessons = state.reservedLessons.filter((el) => el.id === action.payload)
      state.reservedLessons = reservedLessons
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })
  },
})

export const { setLoadingStatus } = reservedLessonsSlice.actions

export default reservedLessonsSlice.reducer

export const reservedLessonsSelector = (state: RootState) => state.reservedLessons
