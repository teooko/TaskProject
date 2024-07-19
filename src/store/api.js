import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_DOMAIN} from "../../config";

const transformDailyTasks = (response) => {
    response = response.$values;
    const response2 =  response.map(task => {
        const parts = task.time.split(':');
        const hours = parseInt(parts[0]);
        const minutes = parseInt(parts[1]);
        const seconds = parseInt(parts[2].split('.')[0]);

        const totalSeconds =
            seconds + minutes * 60 + hours * 60 * 60;
        return {...task, time: totalSeconds};
    });
    return response2.map(task => ({
        name: task.name,
        seconds: task.time,
        color: task.color,
    }))
}

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: API_DOMAIN,
        prepareHeaders: (headers, {getState}) => {
            const token = getState().account.bearerToken;
            if(token)
                headers.set('Authorization', `Bearer ${token}`);
            return headers;
        }}),
    endpoints: (build) => ({
        getTasks: build.query({
            query: () => '/Task',
            transformResponse: (response) => response.$values,
        }),
        getDailyTasks: build.query({
            query: (date) => `/Task/date/${date}`,
            transformResponse: (response) => transformDailyTasks(response),
        })
    }),
});

export const { useGetTasksQuery, useGetDailyTasksQuery } = api;
export default api;