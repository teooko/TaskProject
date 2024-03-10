import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {useDispatch} from "react-redux";
import async from "async";

const initialState = {
    tasks: [],
    newTask: {},
    status: "idle",
    error: null,
    dailyStatus: "idle",
    dailyTasks: []
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get('http://192.168.100.8:5133/Task')
    return response.data
})

export const addNewTask = createAsyncThunk('tasks/addNewTask', async (initialTask) => {
    const response = await axios.post('http://192.168.100.8:5133/Task', initialTask);
    return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async(taskId) => {
    const response = await axios.delete(`http://192.168.100.8:5133/Task/${taskId}`);
    return response.data;
})

export const fetchDailyTasks = createAsyncThunk('/tasks/date/fetchDailyTasks', async(date) => {
    const response = await axios.get(`http://192.168.100.8:5133/Task/date/${date}`);
    
    return response.data;
})

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setNewTask(state, {payload})
        {
            state.newTask = payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTasks.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.tasks = action.payload.$values;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchDailyTasks.pending, (state, action) => {
                state.dailyStatus = 'loading'
            })
            .addCase(fetchDailyTasks.fulfilled, (state, action) => {
                state.dailyStatus = 'succeeded'
                state.dailyTasks = action.payload.$values;
            })
            .addCase(fetchDailyTasks.rejected, (state, action) => {
                state.dailyStatus = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewTask.fulfilled, (state, action) => {
                state.tasks = [...state.tasks, action.payload];
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
            })
    }
})

export const {loadTasks, setNewTask} = slice.actions;
export default slice.reducer;