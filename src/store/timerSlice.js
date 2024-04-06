import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    currentWorkSessionId: 0,
    currentTaskId: 0,
    timerRunning: false,
    time: 3000,
    pickerVisible: false,
};

export const postStartTimer = createAsyncThunk(
    'timer/startTimer',
    async taskId => {
        const response = await axios.post(
            `http://192.168.100.8:5133/WorkSession/${taskId}`,
        );
        return response.data;
    },
);

export const patchStopTimer = createAsyncThunk(
    'timer/stopTimer',
    async workSessionId => {
        const response = await axios.patch(
            `http://192.168.100.8:5133/WorkSession/${workSessionId}`,
        );
        return response.data;
    },
);

const slice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        setCurrentTaskId (state, {payload}) {
            state.currentTaskId = payload;
        },
        startTimer(state) {
            state.timerRunning = true;
        },
        stopTimer(state) {
            state.timerRunning = false;
        },
        setTime(state, {payload}) {
            console.log(payload);
            state.time = payload;
        },
        openPicker(state) {
            state.pickerVisible = true;
        },
        closePicker(state) {
            state.pickerVisible = false;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(postStartTimer.fulfilled, (state, action) => {
                state.currentWorkSessionId = action.payload.id;
            })
            .addCase(patchStopTimer.fulfilled, (state, action) => {
                console.log(action.payload);
            });
    },
});

export const {setCurrentTaskId, startTimer, stopTimer, openPicker, closePicker, setTime} = slice.actions
export default slice.reducer;
