import {fetchDailyTasks, fetchTasks, resetTaskState} from "../store/tasksSlice";
import {fetchWeeklyTasks, insertDays, resetCalendarState, selectDay} from "../store/slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const useStartup = () => {
    const dispatch = useDispatch();
    const { bearerToken } = useSelector(state => state.account);
    
    useEffect(() => {
        dispatch(selectDay(0));
        dispatch(resetCalendarState());
        dispatch(resetTaskState());
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        dispatch(fetchTasks(bearerToken));
        dispatch(fetchDailyTasks({ bearerToken, date: formattedDate }));
        dispatch(insertDays());
        dispatch(fetchWeeklyTasks({ bearerToken, fromDate: 0 }));
        console.log("SE AJUNGE AICI?");
    }, [dispatch, bearerToken]);
    
};
