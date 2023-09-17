import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from '../Redux/StudentSlice';

export default configureStore({
  reducer: {
    students: studentsReducer,
  },
});
