import { createSlice } from "@reduxjs/toolkit";
export const AppSlice = createSlice({
  name: "todo",
  initialState: {
    taskItems: [],
    startTask: false,
    startedTask: "",
    startedTaskId: 0,
  },
  reducers: {
    settaskItems: (state, action) => {
      state.taskItems = action.payload;
    },
    setstartTask: (state, action) => {
      state.startTask = action.payload;
    },
    setstartedTask: (state, action) => {
      state.startedTask = action.payload;
    },
    setstartedTaskId: (state, action) => {
      state.startedTaskId = action.payload;
    },
  },
});

export const { settaskItems, setstartTask, setstartedTask, setstartedTaskId } =
  AppSlice.actions;
export default AppSlice.reducer;
