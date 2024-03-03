import axios from "axios";
import { useEffect, useState } from "react";
import {API_DOMAIN} from "../../config";
import {useDispatch} from "react-redux";
import {loadTasks} from "../store/tasksSlice";

const useFetchData = (route) => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_DOMAIN}${route}`);
                dispatch(loadTasks(response.data.$values));
            } catch (error) {
                setError(error);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return { data, setData, isLoading, error };
};

export default useFetchData;
