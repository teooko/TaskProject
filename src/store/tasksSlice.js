import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import async from 'async';
import {API_DOMAIN} from "../../config";

const today = new Date(Date.now()).toString();

const initialState = {
    selectedDate: today,
};

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setSelectedDate(state, {payload}) {
            state.selectedDate = payload;
        }
    },
});

export const {loadTasks, setNewTask, resetTaskState, setSelectedDate} = slice.actions;
export default slice.reducer;
