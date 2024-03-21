import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {patchStopTimer, postStartTimer} from './timerSlice';

const today = new Date(Date.now());

const initialState = {
    data: [],
    days: {
        daysById: {},
    },
    selected: 0,
    lastLoaded: 0,
    max: 65,
    loading: 6,
    month: today.getMonth(),
    year: today.getFullYear(),
};

export const fetchWeeklyTasks = createAsyncThunk(
    'tasks/fetchWeeklyTasks',
    async fromDate => {
        const response = await axios.get(
            `http://192.168.100.8:5133/Task/weekly/${fromDate}`,
        );
        return response.data;
    },
);

const slice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        insertDays(state) {
            //fetchWeeklyTasks(state.lastLoaded);
            if (state.lastLoaded >= state.max) {
                return;
            }
            for (
                let i = state.lastLoaded;
                i <= state.lastLoaded + state.loading;
                i++
            ) {
                const date = new Date();
                date.setDate(today.getDate() - i);
                state.data.push(i);
                state.days.daysById[i] = {
                    id: i,
                    monthDay: date.getDate(),
                    weekDay: date.getDay(),
                    month: date.getMonth(),
                    year: date.getFullYear(),
                };
            }
            state.lastLoaded = state.lastLoaded + state.loading + 1;
        },
        selectDay(state, {payload}) {
            state.selected = payload;
        },
        changeHeader(state, {payload}) {
            if (payload.changed[0].isViewable) {
                const id = payload.changed[0].item;

                if (state.days.daysById[id].month !== state.month) {
                    state.month = state.days.daysById[id].month;
                }
                if (state.days.daysById[id].year !== state.year) {
                    state.year = state.days.daysById[id].year;
                }
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchWeeklyTasks.fulfilled, (state, action) => {
                const today = Date.now();

                action.payload.$values.map(weekDay => {
                    const newTimestamp = new Date(weekDay.day);

                    const difference = today - newTimestamp;
                    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
                    const daysPassed = Math.floor(
                        difference / millisecondsPerDay,
                    );

                    state.days.daysById[daysPassed].colors =
                        weekDay.colors.$values;
                    console.log(state.days.daysById);
                });
            })
            .addCase(fetchWeeklyTasks.rejected, (state, action) => {
                console.log(action.error);
            });
    },
});

export const {insertDays, selectDay, changeHeader} = slice.actions;
export default slice.reducer;
