import {configureStore} from "@reduxjs/toolkit";
import calendarReducer, { insertDays } from "./slice";
import tasksReducer, {fetchTasks} from "./tasksSlice";
import timerReducer from "./timerSlice"

const store = configureStore({
    reducer: {
        calendarReducer: calendarReducer,
        tasksReducer: tasksReducer,
        timerReducer: timerReducer
    }
});
store.dispatch(insertDays());
store.dispatch(fetchTasks());
export default store;