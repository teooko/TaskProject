import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    roomId: null,
    showInvitationModal: false,
}

const slice = createSlice({
    name: "webSocket",
    initialState,
    reducers: {
        triggerInvitationModal(state) {
            state.showInvitationModal = !state.showInvitationModal;
        }
    }
})

export const {triggerInvitationModal} = slice.actions;

export default slice.reducer;