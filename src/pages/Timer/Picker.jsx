import React, {useState} from 'react';
import {Button, View} from "react-native";
import {TimerPickerModal} from "react-native-timer-picker";


const Picker = () => {
    const [openTimePicker, setOpenTimePicker] = useState(false);
    
    return (
        <View>
            <Button title={"timepicker"} onPress={() => {setOpenTimePicker(true)}}></Button>
            <TimerPickerModal
                visible={openTimePicker}
                setIsVisible={setOpenTimePicker}
                onConfirm={() => {setOpenTimePicker(false)}}
                modalTitle="Set Time"
                onCancel={() => {}}
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