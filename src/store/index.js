import {configureStore} from '@reduxjs/toolkit';
import calendarReducer, {fetchWeeklyTasks, insertDays} from './slice';
import tasksReducer, {fetchDailyTasks, fetchTasks} from './tasksSlice';
import deviceInfoReducer from './deviceInfoSlice'
import timerReducer from './timerSlice';
import accountReducer from './accountSlice';
import {persistReducer, persistStore} from "redux-persist";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import layoutReducer from './layoutSlice'

const accountPersistConfig = {
    key: 'account',
    storage: AsyncStorage,
};
const persistedAccountReducer = persistReducer(accountPersistConfig, accountReducer);

const store = configureStore({
    reducer: {
        calendar: calendarReducer,
        tasks: tasksReducer,
        timer: timerReducer,
        deviceInfo: deviceInfoReducer,
        account: persistedAccountReducer,
        layout: layoutReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
            
        })
});

export const persistor = persistStore(store);
export default store;
