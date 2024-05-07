import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {act} from "react-test-renderer";
import {localIp} from "../launchSettings";
import {API_DOMAIN} from "../../config";

const initialState = {
    bearerToken: null,
    userName: null,
    profilePicturePath: null,
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

export const getUserClaims = createAsyncThunk(
    'account/userClaims',
    async (bearerToken) => {
        try {
            const response = await axios.get(
                `${API_DOMAIN}/Account`,
                {
                    headers: {
                        Authorization: `Bearer ${bearerToken}`,
                    }
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
        },
        resetUserData(state) {
            state.userName = null;
            state.profilePicturePath = null;
        },
        setProfilePicturePath(state, {payload}) {
            state.profilePicturePath = payload;
        }
    },
    extraReducers(builder){
        builder
            .addCase(postLogIn.fulfilled, (state, action) => {
                state.bearerToken = action.payload.accessToken;
            })
            .addCase(getUserClaims.fulfilled, (state, action) => {
                const claims = action.payload.$values?.reduce((acc, claim) => {
                    acc[claim.type] = claim.value;
                    return acc;
                }, {});
                state.userName = claims?.Username ?? state.userName;
                state.profilePicturePath = claims?.ProfilePicturePath ?? state.profilePicturePath;
            })
    }
})

export const {resetBearerToken, resetUserData, setProfilePicturePath} = slice.actions;
export default slice.reducer;