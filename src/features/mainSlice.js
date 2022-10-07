import { createSlice } from '@reduxjs/toolkit'
import languages from '../static/data/data_language.json'

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    isMobile: false,
    language: languages.find((d, i) => i === 0)
  },
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload < 768
    },
    toggleLanguage: (state) => {
      state.language = state.language.id === 'br'
        ? languages.find(d => d.id === 'en')
        : languages.find(d => d.id === 'br')
    }
  },
})

export const { setIsMobile, toggleLanguage } = mainSlice.actions

export const selectIsMobile = (state) => state.main.isMobile
export const selectLanguage = (state) => state.main.language

export default mainSlice.reducer
