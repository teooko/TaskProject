import {configureStore} from "@reduxjs/toolkit";
import calendarReducer, { insertDays } from "./slice";
import tasksReducer, {fetchTasks} from "./tasksSlice";

const store = configureStore({
    reducer: {
        calendarReducer: calendarReducer,
        tasksReducer: tasksReducer
    }
});
store.dispatch(insertDays());
store.dispatch(fetchTasks());
export default store;