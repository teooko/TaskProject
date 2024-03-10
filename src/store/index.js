import {configureStore} from "@reduxjs/toolkit";
import calendarReducer, { insertDays } from "./slice";
import tasksReducer, {fetchDailyTasks, fetchTasks} from "./tasksSlice";
import timerReducer from "./timerSlice"
import {useDispatch} from "react-redux";

const store = configureStore({
    reducer: {
        calendarReducer: calendarReducer,
        tasksReducer: tasksReducer,
        timerReducer: timerReducer
    }
});
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
const day = String(currentDate.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;

store.dispatch(fetchDailyTasks(formattedDate));
store.dispatch(insertDays());
store.dispatch(fetchTasks());
export default store;