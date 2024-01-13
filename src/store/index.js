import { configureStore } from "@reduxjs/toolkit";
import calendarReducer, { insertDays } from "./slice";


const store = configureStore({
    reducer:
        {
            calendarReducer: calendarReducer
        }
})

store.dispatch(insertDays());
export default store;