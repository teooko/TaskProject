﻿import {fetchDailyTasks, fetchTasks, resetTaskState, setSelectedDate} from "../store/tasksSlice";
import {fetchWeeklyTasks, insertDays, resetCalendarState, selectDay, setData} from "../store/slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {useGetTasksQuery} from "../store/api";

export const useStartup = () => {
    const dispatch = useDispatch();
    const { bearerToken } = useSelector(state => state.account);
    const { lastLoaded } = useSelector(state => state.calendar);
    const { data, error, isLoading } = useGetTasksQuery();
    
    useEffect(() => {
        //separate each matter into different functions
        dispatch(resetCalendarState());
        dispatch(resetTaskState());
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        //dispatch(fetchTasks(bearerToken));
        
        dispatch(setSelectedDate(formattedDate));
        dispatch(fetchWeeklyTasks({ bearerToken, fromDate: 0 }));
        dispatch(insertDays());
    }, [bearerToken]);
    
};
