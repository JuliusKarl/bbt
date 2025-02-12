import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// TODO: Define stock types

export interface StocksState {
  allStocks: [],
}

const initialState: StocksState = {
  allStocks: []
}

export const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setAllStocks: (state, action) => {
      state.allStocks = action.payload
    },
  },
})

export const { setAllStocks } = stocksSlice.actions

export default stocksSlice.reducer