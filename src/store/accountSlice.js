import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {act} from "react-test-renderer";
import {localIp} from "../launchSettings";
import {API_DOMAIN} from "../../config";

const initialState = {
    bearerToken: null,
};

export const postLogInDefault = createAsyncThunk(
    'account/logInDefault',
    async (requestData, thunkAPI) => {
        try {
            const requestData = {
                email: 'string@asd.com',
                password: 'S!1string',
                twoFactorCode: 'string',
                twoFactorRecoveryCode: 'string', 
            };

            // Make POST request to the login endpoint with the data payload
            const response = await axios.post(
                `${API_DOMAIN}/login`,
                requestData,  // Pass the data payload as the second argument
                {
                    headers: {
                        'Content-Type': 'application/json',  // Specify content type as JSON
                        'accept': 'application/json',  // Specify expected response type as JSON
                    },
                }
            );

            // Return the response data (this will be stored in Redux state by createAsyncThunk)
            return response.data;
        } catch (error) {
            // Handle any errors (e.g., network error, server error, etc.)
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const postLogInOtherAcc = createAsyncThunk(
    'account/logInOtherAcc',
    async (requestData, thunkAPI) => {
        try {
            // Define the data payload to be sent in the request body
            const requestData = {
                email: 'oaianuti@mail.com',
                password: 'S!1string',
                twoFactorCode: 'string',
                twoFactorRecoveryCode: 'string',
            };

            // Make POST request to the login endpoint with the data payload
            const response = await axios.post(
                `${API_DOMAIN}/login`,
                requestData,  // Pass the data payload as the second argument
                {
                    headers: {
                        'Content-Type': 'application/json',  // Specify content type as JSON
                        'accept': 'application/json',  // Specify expected response type as JSON
                    },
                }
            );

            // Return the response data (this will be stored in Redux state by createAsyncThunk)
            return response.data;
        } catch (error) {
            // Handle any errors (e.g., network error, server error, etc.)
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const postRegister = createAsyncThunk(
    'account/register',
    async ({values}) => { // Correct payload structure
        try {
            const response = await axios.post(
                `${API_DOMAIN}/register`,
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
            .addCase(postLogInDefault.fulfilled, (state, action) => {
                state.bearerToken = action.payload.accessToken;
            })
            .addCase(postLogInOtherAcc.fulfilled, (state, action) => {
                state.bearerToken = action.payload.accessToken;
            })
    }
})

export const {resetBearerToken} = slice.actions;
export default slice.reducer;