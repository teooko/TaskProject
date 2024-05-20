import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_DOMAIN} from "../../config";

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
    async ({bearerToken, fromDate}) => {
        const response = await axios.get(
            `${API_DOMAIN}/Task/weekly/${fromDate}`, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                }
            }
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
        resetCalendarState(state) {
            state.data = [];
            state.days = {
                daysById: {},
            };
            state.selected = 0;
            state.lastLoaded = 0;
            state.max = 65;
            state.loading = 6;
            state.month = today.getMonth();
            state.year = today.getFullYear();
            //state = initialState;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchWeeklyTasks.fulfilled, (state, action) => {
                const today = Date.now();

                action.payload.$values.map(weekDay => {
                    const newTimestamp = new Date(weekDay.day);

                    const difference = today - newTimestamp;
                    const millisecondsPerDay = 24 * 60 * 60 * 1000;
                    const daysPassed = Math.floor(
                        difference / millisecondsPerDay,
                    );

                    state.days.daysById[daysPassed].colors =
                        weekDay.colors.$values;
                });
            })
            .addCase(fetchWeeklyTasks.rejected, (state, action) => {
                console.log(action.error);
            });
    },
});

export const {insertDays, selectDay, changeHeader, resetCalendarState} = slice.actions;
export default slice.reducer;
