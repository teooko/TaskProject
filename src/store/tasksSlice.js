import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    newTask: {},
}

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
    }
})

export const {loadTasks, addNewTask, setNewTask} = slice.actions;

export default slice.reducer;