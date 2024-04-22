import {configureStore} from '@reduxjs/toolkit';
import calendarReducer, {fetchWeeklyTasks, insertDays} from './slice';
import tasksReducer, {fetchDailyTasks, fetchTasks} from './tasksSlice';
import deviceInfoReducer from './deviceInfoSlice'
import timerReducer from './timerSlice';
import accountReducer from './accountSlice';

const store = configureStore({
    reducer: {
        calendar: calendarReducer,
        tasks: tasksReducer,
        timer: timerReducer,
        deviceInfo: deviceInfoReducer,
        account: accountReducer
    },
});
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
const day = String(currentDate.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;

store.dispatch(fetchDailyTasks(formattedDate));
store.dispatch(insertDays());
store.dispatch(fetchTasks());
store.dispatch(fetchWeeklyTasks(0));
export default store;
