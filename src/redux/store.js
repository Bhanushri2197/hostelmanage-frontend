import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import roomReducer from './slice/roomSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    rooms: roomReducer,
  },
});
