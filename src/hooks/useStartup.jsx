import {useGetTasksQuery} from "../store/api";

export const useStartup = () => {
    useGetTasksQuery();
};
