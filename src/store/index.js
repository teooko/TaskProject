import {configureStore} from '@reduxjs/toolkit';
import calendarReducer, {fetchWeeklyTasks, insertDays} from './slice';
import tasksReducer, {fetchDailyTasks, fetchTasks} from './tasksSlice';
import deviceInfoReducer from './deviceInfoSlice'
import timerReducer from './timerSlice';
import accountReducer from './accountSlice';
import webSocketReducer from './webSocketSlice'
import {persistReducer, persistStore} from "redux-persist";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import layoutReducer from './layoutSlice'
import api from "./api";

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
        webSocket: webSocketReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
            
        }).concat(api.middleware),
});
const bearerToken = store.getState().account.bearerToken;
store.dispatch(insertDays());
store.dispatch(fetchWeeklyTasks({ bearerToken, fromDate: 0 }))



export const persistor = persistStore(store);
export default store;
