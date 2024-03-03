import {combineReducers, configureStore, createStore} from "@reduxjs/toolkit";
import calendarReducer, { insertDays } from "./slice";
import tasksReducer from "./tasksSlice";
import {composeWithDevTools} from "@reduxjs/toolkit/src/devtoolsExtension";

const rootReducer = combineReducers({
    calendarReducer: calendarReducer,
    tasksReducer: tasksReducer
        
})
const store = createStore(rootReducer, composeWithDevTools());
store.dispatch(insertDays());

export default store;