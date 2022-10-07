import { configureStore } from '@reduxjs/toolkit'
import mainReducer from '../features/mainSlice'

export default configureStore({
  reducer: {
    main: mainReducer
  }
})
