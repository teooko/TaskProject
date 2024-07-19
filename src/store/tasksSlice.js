import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import async from 'async';
import {API_DOMAIN} from "../../config";

const initialState = {
    tasks: [],
    newTask: {},
    status: 'idle',
    error: null,
    dailyTasks: [],
    halfYearTime: [],
    totalTasksTime: [],
    selectedDate: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (bearerToken) => {
    const response = await axios.get(`${API_DOMAIN}/Task`, {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
        }
    });
    return response.data;
});

export const addNewTask = createAsyncThunk(
    'tasks/addNewTask',
    async ({bearerToken, initialTask}) => {
        const response = await axios.post(
            `${API_DOMAIN}/Task`,
            initialTask, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                }
            }
        );
        return response.data;
    },
);

export const fetchHalfYearTime = createAsyncThunk(
    'tasks/monthly',
    async ({bearerToken}) => {
        const response = await axios.get(
            `${API_DOMAIN}/Task/monthly`,
            {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                }
            }
        );
        
        return response.data;
    },
);

export const fetchTotalTasksTime = createAsyncThunk(
    'tasks/total',
    async ({bearerToken}) => {
        const response = await axios.get(
            `${API_DOMAIN}/Task/total`,
            {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                }
            }
        );
        console.log(response.data);
        return response.data;
    },
);

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (taskId, {rejectWithValue}) => {
        try {
            const response = await axios.delete(
                `${API_DOMAIN}/Task?id=${taskId}`,
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
    async ({bearerToken, date}) => {
        const response = await axios.get(
            `${API_DOMAIN}/Task/date/${date}`,
            {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                }
            }
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
        resetTaskState(state) {
            state = initialState;
        },
        setSelectedDate(state, {payload}) {
            state.selectedDate = payload;
        }
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

export const {loadTasks, setNewTask, resetTaskState, setSelectedDate} = slice.actions;
export default slice.reducer;
