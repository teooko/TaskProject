import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_DOMAIN} from "../../config";


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