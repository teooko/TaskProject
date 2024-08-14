import React from 'react';
import {StatusBar, StyleSheet, View} from "react-native";
import CountDown from "react-native-countdown-fixed";
import {openPicker, setCurrentTime} from "../../store/timerSlice";
import {useDispatch} from "react-redux";

const HorizontalTimer = ({countDownId, orientation, handleTimerFinished, time, timerRunning}) => {
    const dispatch = useDispatch();
    return (
        <View style={{display: "flex", justifyContent: "center", backgroundColor: "black", height: "100%", width: "100%", position: "absolute", zIndex: orientation === "PORTRAIT" ? -2 : 3}}>
            <StatusBar hidden={orientation !== "PORTRAIT"}/>
            <CountDown
                id={countDownId}
                size={100}
                until={time}
                style={styles.timer}
                onFinish={() => handleTimerFinished()}
                digitStyle={{width: 200, borderRadius: 20, backgroundColor: '#0F0F0F'}}
                digitTxtStyle={{color: 'white'}}
                separatorStyle={{color: "white"}}
                timeToShow={['H', 'M', 'S']}
                timeLabels={{m: null, s: null}}
                running={timerRunning}
                onPress={() => dispatch(openPicker())}
                onChange={(value) => dispatch(setCurrentTime(value))}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    timer: {
        zIndex: 2,
        fontSize: 60,
        marginLeft: "auto",
        marginRight: "auto",
        top: -150
    },
    icon: {
        fill: 'white',
    },
    button: {
        marginBottom: 30,
        width: 20,
        height: 20,
    },
    controls: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
    },
    buttonText: {
        color: "white",
    },
    addFriendsButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        marginBottom: 10,
        height: 30
    },
    profileImages: {
        width: 30,
        height: 30,
        borderRadius: 15
    }
});
export default HorizontalTimer;