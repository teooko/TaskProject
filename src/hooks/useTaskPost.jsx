import axios from "axios";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

const useTaskPost = () => {
    const [newTask, setNewTask] = useState({});
    const [isTaskLoading, setIsTaskLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const addNewTask = async (newTaskName, newTaskColor) => {
        try {
            const response = await axios.post("http://192.168.100.8:5133/Task", {
                name: newTaskName,
                color: newTaskColor
            });
            await dispatch(setNewTask(response.data));
            await dispatch(addNewTask());
            
        } catch (error) {
            setError(error);
            console.error(error);
        }
        setIsTaskLoading(false);
    }
    
    return {newTask, addNewTask, isTaskLoading, error}
}

export default useTaskPost;