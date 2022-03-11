import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './AppSlice';

export default configureStore({
  reducer: {
    todo:todoReducer
  }
})