import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {act} from "react-test-renderer";
import {localIp} from "../launchSettings";
import {API_DOMAIN} from "../../config";

const initialState = {
    bearerToken: null,
};

export const postRegister = createAsyncThunk(
    'account/register',
    async (values) => {
        console.log(values);
        try {
            const response = await axios.post(
                `${API_DOMAIN}/register`,
                values,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const postLogIn = createAsyncThunk(
    'account/login',
    async (values) => { 
        try {
            const response = await axios.post(
                `${API_DOMAIN}/login`,
                values,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json', // 'accept' should be 'Accept'
                    },
                }
            );
            return response.data;
        } catch (error) {
            // Handle error if needed
            throw error;
        }
    }
);

const slice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        resetBearerToken(state) {
            state.bearerToken = null;
        }
    },
    extraReducers(builder){
        builder
            .addCase(postLogIn.fulfilled, (state, action) => {
                state.bearerToken = action.payload.accessToken;
            })
    }
})

export const {resetBearerToken} = slice.actions;
export default slice.reducer;