import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_DOMAIN} from "../../config";

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
    }),
});

export const { useGetTasksQuery } = api;
export default api;