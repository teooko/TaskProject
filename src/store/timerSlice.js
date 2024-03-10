import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    currentTaskId: 0
}

export const postStartTimer = createAsyncThunk('timer/startTimer', async (taskId) => {
    const response = await axios.post(`http://192.168.100.8:5133/WorkSession/${taskId}`);
    return response.data;
})

export const patchStopTimer = createAsyncThunk('timer/stopTimer', async (workSessionId) => {
    const response = await axios.patch(`http://192.168.100.8:5133/WorkSession/${workSessionId}`);
    return response.data;
})

const slice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        
    },
    extraReducers(builder) {
        builder
            .addCase(postStartTimer.fulfilled, (state, action) => {
                state.currentTaskId = action.payload.id;
            })
            .addCase(patchStopTimer.fulfilled, (state, action) => {
                console.log(action.payload);
            })
    }
})

export default  slice.reducer;