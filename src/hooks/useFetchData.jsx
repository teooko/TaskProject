import axios from "axios";
import { useEffect, useState } from "react";
import {API_DOMAIN} from "../../config";

const useFetchData = (route) => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_DOMAIN}${route}`);
                setData(response.data.$values);
            } catch (error) {
                setError(error);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return { data, isLoading, error };
};

export default useFetchData;
