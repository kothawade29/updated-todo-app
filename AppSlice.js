import { createSlice } from '@reduxjs/toolkit';
export const AppSlice = createSlice({
    name:'todo',
    initialState:{
        taskItems:[]
    },
    reducers:{
        settaskItems:(state,action) =>{
            console.log("action ----> ", JSON.stringify(action.payload));
            state.taskItems=action.payload;
        }
    }
})

export const {settaskItems} =AppSlice.actions;
export default AppSlice.reducer;