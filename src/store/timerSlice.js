import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_DOMAIN} from "../../config";

const initialState = {
    currentWorkSessionId: 0,
    currentTaskId: 0,
    timerRunning: null,
    time: null,
    currentTime: 60,
    pickerVisible: false,
    reset: false,
    breakTime: 300,
    workingTime: 60,
    isBreak: false,
};

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
        },
        setIsBreak(state, {payload}) {
            state.isBreak = payload;
        },
        setWorkingTime(state, {payload}) {
            state.workingTime = payload;
        },
        setBreakTime(state, {payload}) {
            state.breakTime = payload;
        },
        setWorkSessionId(state, {payload}) {
            state.currentWorkSessionId = payload;
        }
    },
});

export const {setCurrentTaskId, startTimer, stopTimer,
    openPicker, closePicker, setTime,
    setReset, setCurrentTime, setIsBreak,
    setWorkingTime, setBreakTime, setWorkSessionId} = slice.actions
export default slice.reducer;
