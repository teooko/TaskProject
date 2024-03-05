import {applyMiddleware, combineReducers, configureStore, createStore} from "@reduxjs/toolkit";
import calendarReducer, { insertDays } from "./slice";
import tasksReducer, {fetchTasks} from "./tasksSlice";
import {composeWithDevTools} from "@reduxjs/toolkit/src/devtoolsExtension";
import {thunk} from "redux-thunk";


const store = configureStore({
    reducer: {
        calendarReducer: calendarReducer,
        tasksReducer: tasksReducer
    }
});
store.dispatch(insertDays());
store.dispatch(fetchTasks());
export default store;