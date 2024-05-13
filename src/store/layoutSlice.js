import {createSlice} from '@reduxjs/toolkit';
import {menus} from "../constants";

const initialState = {
    menu: menus.authenticate
}

const slice = createSlice({
    name: "deviceInfo",
    initialState,
    reducers: {
        goToPage(state, {payload}) {
            state.menu = payload;
        },
    }
})

export const {goToPage} = slice.actions;

export default slice.reducer;