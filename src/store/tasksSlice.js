import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import async from 'async';

const initialState = {
    tasks: [],
    newTask: {},
    status: 'idle',
    error: null,
    dailyStatus: 'idle',
    dailyTasks: [],
    halfYearTime: [],
    totalTasksTime: []
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (bearerToken) => {
    const response = await axios.get('http://192.168.100.8:5133/Task', {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
        }
    });
    //console.log(response.data);
    return response.data;
});

export const addNewTask = createAsyncThunk(
    'tasks/addNewTask',
    async initialTask => {
        const response = await axios.post(
            'http://192.168.100.8:5133/Task',
            initialTask,
        );
        return response.data;
    },
);

export const fetchHalfYearTime = createAsyncThunk(
    'tasks/monthly',
    async () => {
        const response = await axios.get(
            'http://192.168.100.8:5133/Task/monthly'
        );
        return response.data;
    },
);

export const fetchTotalTasksTime = createAsyncThunk(
    'tasks/total',
    async () => {
        const response = await axios.get(
            'http://192.168.100.8:5133/Task/total'
        );
        return response.data;
    },
);

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (taskId, {rejectWithValue}) => {
        try {
            const response = await axios.delete(
                `http://192.168.100.8:5133/Task?id=${taskId}`,
            );
            return response.data;
        } catch (error) {
            console.error('Error deleting task:', error);
            return rejectWithValue(error.response.data);
        }
    },
);

export const fetchDailyTasks = createAsyncThunk(
    '/tasks/date/fetchDailyTasks',
    async date => {
        const response = await axios.get(
            `http://192.168.100.8:5133/Task/date/${date}`,
        );
        return response.data;
    },
);

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setNewTask(state, {payload}) {
            state.newTask = payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTasks.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload.$values;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchDailyTasks.pending, (state, action) => {
                state.dailyStatus = 'loading';
            })
            .addCase(fetchDailyTasks.fulfilled, (state, action) => {
                state.dailyStatus = 'succeeded';
                const response = action.payload.$values;

                state.dailyTasks = response.map(task => {
                    const parts = task.time.split(':');
                    const hours = parseInt(parts[0]);
                    const minutes = parseInt(parts[1]);
                    const seconds = parseInt(parts[2].split('.')[0]);

                    const totalSeconds =
                        seconds + minutes * 60 + hours * 60 * 60;
                    return {...task, time: totalSeconds};
                });
            })
            .addCase(fetchDailyTasks.rejected, (state, action) => {
                state.dailyStatus = 'failed';
                state.error = action.error.message;
                console.log(action.error.message);
            })
            .addCase(addNewTask.fulfilled, (state, action) => {
                state.tasks = [...state.tasks, action.payload];
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(
                    task => task.id !== action.payload.id,
                );
            })
            .addCase(fetchHalfYearTime.fulfilled, (state, action) => {
                state.halfYearTime = action.payload.$values;
            })
            .addCase(fetchTotalTasksTime.fulfilled, (state, action) => {
                state.totalTasksTime = action.payload.$values;
            });
    },
});

export const {loadTasks, setNewTask} = slice.actions;
export default slice.reducer;
