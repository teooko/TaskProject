import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_DOMAIN} from "../../config";

const initialState = {
    currentWorkSessionId: 0,
    currentTaskId: 0,
    timerRunning: false,
    time: null,
    currentTime: 60,
    pickerVisible: false,
    reset: false
};

export const postStartTimer = createAsyncThunk(
    'timer/startTimer',
    async taskId => {
        const response = await axios.post(
            `${API_DOMAIN}/WorkSession/${taskId}`,
        );
        return response.data;
    },
);

export const patchStopTimer = createAsyncThunk(
    'timer/stopTimer',
    async workSessionId => {
        const response = await axios.patch(
            `${API_DOMAIN}/WorkSession/${workSessionId}`,
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
            state.time = payload;
            state.currentTime =  payload;
        },
        openPicker(state) {
            state.pickerVisible = true;
        },
        closePicker(state) {
            state.pickerVisible = false;
        },
        setReset(state) {
            state.reset = !state.reset;
            state.currentTime = state.time;
        },
        setCurrentTime(state, {payload}) {
            state.currentTime =  payload - 1;
        }
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

export const {setCurrentTaskId, startTimer, stopTimer, openPicker, closePicker, setTime, setReset, setCurrentTime} = slice.actions
export default slice.reducer;
