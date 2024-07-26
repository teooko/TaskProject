import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_DOMAIN} from "../../config";
import {setNewTokens} from "./accountSlice";


const parseSeconds = (response) => {
    return response.map(task => {
        const [hours, minutes, seconds] = task.time.split(':').map(part => parseInt(part.split('.')[0]));
        const totalSeconds = seconds + minutes * 60 + hours * 3600;
        return {...task, time: totalSeconds};
    });
};

const transformDailyTasks = (response) => {
    const parsedResponse = parseSeconds(response.$values);
    return parsedResponse.map(({ name, time: seconds, color }) => ({ name, seconds, color }));
};

const parseWeeklyTasks = (response) => {
    const today = Date.now();

    return response.map(weekDay => {
        const newTimestamp = new Date(weekDay.day);

        const difference = today - newTimestamp;
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const daysPassed = Math.floor(
            difference / millisecondsPerDay,
        );

        state.days.daysById[daysPassed].colors =
            weekDay.colors.$values;
    });
}

function convertTimeStringToHours(timeString) {
    // Split the time string into components
    const [hours, minutes, seconds] = timeString.split(':');

    // Parse hours, minutes, and seconds
    const parsedHours = parseInt(hours, 10);
    const parsedMinutes = parseInt(minutes, 10);
    const parsedSeconds = parseFloat(seconds); // Parse seconds as float for decimal precision

    // Calculate total hours
    const totalMinutes = parsedHours + (parsedMinutes) + (parsedSeconds / 60);

    return totalMinutes;
}

const parseMontlyTasks = (response) => {
    const newData = [0, 0, 0, 0, 0, 0];
    
    response.map(month => {
        const hours = convertTimeStringToHours(month.time);
        newData[month.monthNumber - 1] = hours;
    });
    
    return newData;
}

const parseTasksActivity = (response) => {
    const labels = response.map(task => task.name);
    const data = response.map(({time}) => time).map(convertTimeStringToHours);
    return {
        labels: labels,
        datasets: [
            {
                data: data
            }
        ]
    };
}

const baseQuery = fetchBaseQuery({baseUrl: API_DOMAIN,
    prepareHeaders: (headers, {getState}) => {
        const token = getState().account.bearerToken;
        if(token)
            headers.set('Authorization', `Bearer ${token}`);
        return headers;
    }});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    const refreshToken = api.getState().account.refreshToken;
    const token = api.getState().account.bearerToken;
    if( result.error && result.error.status === 401 && token !== null) {
        const refreshResult = await baseQuery({url: '/refresh', method: 'POST', body: {refreshToken}}, api, extraOptions);
        if(refreshResult.data) {
            api.dispatch(setNewTokens(refreshResult.data));
            console.log("TOKENS RECEIVED");
            result = await baseQuery(args, api, extraOptions);
        } else {
            console.log("LOGGED OUT " + refreshToken + token);
        }
    }
    return result;
}

const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Task'],
    endpoints: (build) => ({
        getTasks: build.query({
            query: () => '/Task',
            transformResponse: (response) => response.$values,
            providesTags: ['Task'],
        }),
        getDailyTasks: build.query({
            query: (date) => `/Task/date/${date}`,
            transformResponse: (response) => transformDailyTasks(response),
        }),
        postTask: build.mutation({
            query: (body) => {
                return {
                    url: `/Task`, 
                    method: `POST`,
                    body
                }},
            transformResponse: (response) => { console.log("Added new task") },
            invalidatesTags: ['Task']
        }),
        deleteTask: build.mutation({
            query: (taskId) => {
                return {
                    url: `/Task?id=${taskId}`,
                    method: `DELETE`
                }
            },
            transformResponse: (response) => {console.log("Deleted task")},
            invalidatesTags: ['Task']
        }),
        getWeeklyTasks: build.query({
            query: (fromDate) => `/Task/weekly/${fromDate}`,
            transformResponse: (response) => {}
        }),
        getMonthlyActivity: build.query({
            query: () => `/Task/monthly`,
            transformResponse: (response) => parseMontlyTasks(response.$values)
        }),
        getTasksActivity: build.query({
            query: () => `/Task/total`,
            transformResponse: (response) => parseTasksActivity(response.$values)
        })
    }),
});

export const { useGetTasksQuery, useGetDailyTasksQuery, usePostTaskMutation, useDeleteTaskMutation, useGetWeeklyTasksQuery, useGetMonthlyActivityQuery, useGetTasksActivityQuery } = api;
export default api;