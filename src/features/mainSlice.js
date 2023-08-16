import { createSlice } from '@reduxjs/toolkit'

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    isMobile: false
  },
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload < 768
    }
  },
})

export const { setIsMobile } = mainSlice.actions

export const selectIsMobile = (state) => state.main.isMobile

export default mainSlice.reducer
