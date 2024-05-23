import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_DOMAIN} from "../../config";

const initialState = {
    roomId: null,
    showInvitationModal: false,
    connectionString: `ws://192.168.100.8:8080`
}

export const postCreateGroupSession = createAsyncThunk(
    'groupSession/create',
    async (bearerToken) => {
        try {
            const response = await axios.post(
                `${API_DOMAIN}/GroupSession`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${bearerToken}`,
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);

const slice = createSlice({
    name: "webSocket",
    initialState,
    reducers: {
        triggerInvitationModal(state) {
            state.showInvitationModal = !state.showInvitationModal;
        }
    },
    extraReducers(builder)
    {
        builder
            .addCase(postCreateGroupSession.fulfilled, (state, action) => {
                state.roomId = action.payload.id;
            })
    }
})

export const {triggerInvitationModal} = slice.actions;

export default slice.reducer;