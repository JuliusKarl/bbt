import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
  error: boolean,
  errorMessage: string,
}

const initialState: AppState = {
  error: false,
  errorMessage: '',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload
    },
  },
})

export const { setError, setErrorMessage } = appSlice.actions

export default appSlice.reducer