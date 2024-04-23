import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {act} from "react-test-renderer";

const initialState = {
    bearerToken: null,
};

export const postLogInDefault = createAsyncThunk(
    'account/logInDefault',
    async (requestData, thunkAPI) => {
        try {
            // Define the data payload to be sent in the request body
            const requestData = {
                email: 'string@mail.com',
                password: 'S!1string',
                twoFactorCode: 'string',
                twoFactorRecoveryCode: 'string', 
            };

            // Make POST request to the login endpoint with the data payload
            const response = await axios.post(
                'http://192.168.100.8:5133/login',
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

const slice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
            .addCase(postLogInDefault.fulfilled, (state, action) => {
                state.bearerToken = action.payload.accessToken;
                //console.log(action.payload);
            })
    }
})

export default slice.reducer;