import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: [],
};

export const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    clearRooms: (state) => {
      state.rooms = [];
    }
  }
});

export const { setRooms, clearRooms } = roomSlice.actions;
export default roomSlice.reducer;
