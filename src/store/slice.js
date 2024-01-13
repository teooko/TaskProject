import { createSlice } from '@reduxjs/toolkit';

const today = new Date(Date.now());

const initialState = {
    data: [],
    days: {
        daysById: {}
    },
    selected: 0,
    lastLoaded: 0,
    max: 65,
    loading: 6,
    month: today.getMonth(),
    year: today.getFullYear()
}

const slice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        insertDays(state) {
            if(state.lastLoaded >= state.max)
                return;
            for (let i = state.lastLoaded; i <= state.lastLoaded + state.loading; i++) {
                const date = new Date();
                date.setDate(today.getDate() - i);
                state.data.push(i);
                state.days.daysById[i] = {
                            id: i,
                            monthDay: date.getDate(),
                            weekDay: date.getDay(),
                            month: date.getMonth(),
                            year: date.getFullYear()
                        }
            }
            state.lastLoaded = state.lastLoaded + state.loading + 1;
        },
        selectDay(state, {payload})
        {
            state.selected = payload;
        },
        changeHeader(state, {payload})
        {
            if (payload.changed[0].isViewable) {
                const id = payload.changed[0].item;
                
                if (state.days.daysById[id].month !== state.month) {
                    state.month = state.days.daysById[id].month;
                }
                if (state.days.daysById[id].year !== state.year) {
                    state.year = state.days.daysById[id].year;
                }
            }
        }
    }
})

export const { insertDays, selectDay, changeHeader } = slice.actions
export default slice.reducer