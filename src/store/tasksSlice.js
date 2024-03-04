import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {useDispatch} from "react-redux";

const initialState = {
    tasks: [],
    newTask: {},
    status: "idle",
    error: null
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get('http://192.168.100.8:5133/Task')
    return response.data
})

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        loadTasks(state, {payload})
        {
            state.tasks = payload;
        },
        addNewTask(state)
        {
            state.tasks = [...state.tasks, state.newTask];
        },
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
    }
})

export const {loadTasks, addNewTask, setNewTask} = slice.actions;
export default slice.reducer;