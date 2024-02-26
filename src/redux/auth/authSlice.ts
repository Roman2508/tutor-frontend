import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'
import { LoadingStatusTypes } from '../appTypes'
import { AuthType, InitialStateType } from './authTypes'
import { authLogin, authMe, authRegister } from './authAsyncActions'

const authInitialState: InitialStateType = {
  auth: null,
  loadingStatus: LoadingStatusTypes.NEVER,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },
  },
  extraReducers: (builder) => {
    /* authLogin */
    builder.addCase(authLogin.fulfilled, (state, action: PayloadAction<AuthType>) => {
      state.auth = action.payload
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* authRegister */
    builder.addCase(authRegister.fulfilled, (state, action: PayloadAction<AuthType>) => {
      state.auth = action.payload
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* authMe */
    builder.addCase(authMe.fulfilled, (state, action: PayloadAction<AuthType>) => {
      state.auth = action.payload
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })
  },
})

export const { setLoadingStatus } = authSlice.actions

export default authSlice.reducer

export const authSelector = (state: RootState) => state.lessons
