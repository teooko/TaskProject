import React, {useEffect, useState} from 'react';
import {Button, View} from "react-native";
import {TimerPickerModal} from "react-native-timer-picker";
import {useDispatch, useSelector} from "react-redux";
import {closePicker, openPicker, setTime} from "../../store/timerSlice";
import {useWebSocket} from "../../services/WebSocketService";


const Picker = () => {
    const {pickerVisible, timerRunning} = useSelector(state => state.timer);
    const dispatch = useDispatch();
    const roomWs = useWebSocket();
    const setTheTime = (pickedDuration) => {
        dispatch(setTime(pickedDuration.hours * 60 * 60 + pickedDuration.minutes * 60 + pickedDuration.seconds))
        if(roomWs !== null)
        {
            roomWs.send((pickedDuration.hours * 60 * 60 + pickedDuration.minutes * 60 + pickedDuration.seconds).toString());
        }
    }
    
    useEffect(() => {
        setTheTime({hours: 0, minutes: 1, seconds: 0});
    }, []);
    
    return (
        <View>
            <TimerPickerModal
                visible={pickerVisible && !timerRunning}
                setIsVisible={() => dispatch(closePicker())}
                onConfirm={(pickedDuration) => {
                    setTheTime(pickedDuration);
                    dispatch(closePicker());
                }}
                modalTitle="Set Time"
                onCancel={() => {dispatch(closePicker())}}
                closeOnOverlayPress
                initialMinutes = {1}
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