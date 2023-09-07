import { configureStore } from '@reduxjs/toolkit'
import  MotoformDataReducer from './reducers/MotoformDataReducerSlice'
export const store = configureStore({
  reducer: {
    MotoformDataReducer
  },
})
