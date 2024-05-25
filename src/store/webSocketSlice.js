import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_DOMAIN} from "../../config";
import {defaultUser} from "../constants";

const initialState = {
    roomId: null,
    showInvitationModal: false,
    connectionString: `ws://192.168.100.8:8080`,
    userIds: [],
    users: {},
    messages: [],
    sendingMessage: null
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

export const patchJoinGroupSession = createAsyncThunk(
    'groupSession/join',
    async ({bearerToken, roomId}) => {
        try {
            const response = await axios.patch(
                `${API_DOMAIN}/GroupSession/${roomId}/Join`,
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

export const fetchGroupSessionData = createAsyncThunk(
    'groupSession/get',
    async (groupSessionId) => {
        const response = await axios.get(
            `${API_DOMAIN}/GroupSession/${groupSessionId}`
        );
        return response.data;
    },
);

export const getAnotherUserClaims = createAsyncThunk(
    'account/getAnotherUserClaims',
    async ({bearerToken, userId}) => {
        try {
            const response = await axios.get(
                `${API_DOMAIN}/Account/${userId}`,
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
        },
        setRoomId(state, {payload}) {
            state.roomId = payload;
        },
        setSendingMessage(state, {payload}) {
            const newMessage = {
                chat: payload
            }
            state.sendingMessage = JSON.stringify(newMessage);
        },
        addMessage(state, {payload}) {
            state.messages.push(payload);
        }
    },
    extraReducers(builder)
    {
        builder
            .addCase(postCreateGroupSession.fulfilled, (state, action) => {
                state.roomId = action.payload.id;
            })
            .addCase(fetchGroupSessionData.fulfilled, (state, action) => {
                state.userIds = [];
                if(action.payload.userId1)
                    state.userIds.push(action.payload.userId1);
                if(action.payload.userId2)
                    state.userIds.push(action.payload.userId2);
                if(action.payload.userId3)
                    state.userIds.push(action.payload.userId3);
                if(action.payload.userId4)
                    state.userIds.push(action.payload.userId4);
            })
            .addCase(getAnotherUserClaims.fulfilled, (state, action) => {
                const claims = action.payload.$values?.reduce((acc, claim) => {
                    acc[claim.type] = claim.value;
                    return acc;
                }, {});
                state.users[action.meta.arg.userId] = {
                    userName: claims?.Username ?? state.users[action.meta.arg.userId].userName,
                    profilePictureBase64: claims?.ProfilePictureBase64 ?? defaultUser.picture
                };
            })
    }
})

export const {triggerInvitationModal, setRoomId, setSendingMessage, addMessage} = slice.actions;

export default slice.reducer;