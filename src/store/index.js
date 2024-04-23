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

export default store;
