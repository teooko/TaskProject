import React, {useState} from 'react';
import {Button, View} from "react-native";
import {TimerPickerModal} from "react-native-timer-picker";
import {useDispatch, useSelector} from "react-redux";
import {closePicker, openPicker} from "../../store/timerSlice";


const Picker = () => {
    const {pickerVisible} = useSelector(state => state.timer);
    const dispatch = useDispatch();
    return (
        <View>
            <TimerPickerModal
                visible={pickerVisible}
                setIsVisible={() => dispatch(openPicker())}
                onConfirm={() => {dispatch(closePicker())}}
                modalTitle="Set Time"
                onCancel={() => {dispatch(closePicker())}}
                closeOnOverlayPress
                styles={{
                    theme: "light",
                    pickerItem: {
                        color: "#DF5454",
                    },
                    pickerLabel: {
                        color: "#DF5454",
                    },
                    text: {
                        color: "#DF5454",
                    }
                }}
                modalProps={{
                    overlayOpacity: 0.2,
                }}
            />
        </View>
    );
};

export default Picker;