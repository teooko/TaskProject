import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    orientation: "PORTRAIT"
}

const slice = createSlice({
    name: "deviceInfo",
    initialState,
    reducers: {
        setOrientationPortrait(state) {
            state.orientation = "PORTRAIT";
        },
        setOrientationLandscape(state) {
            state.orientation = "LANDSCAPE";
        }
    }
})

export const {setOrientationPortrait, setOrientationLandscape} = slice.actions;

export default slice.reducer;