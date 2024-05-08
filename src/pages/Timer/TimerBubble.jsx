import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View, Text} from "react-native";
import CountDown from "react-native-countdown-fixed";
import TimerAnimation from "./TimerAnimation";
import {useDispatch, useSelector} from "react-redux";
import {openPicker, patchStopTimer, setCurrentTime, setTime} from "../../store/timerSlice";

const {height, width} = Dimensions.get('window');
const TimerBubble = ({
                         backWaveStyle,
                         frontWaveStyle,
                         riseAnimationStyle,
                     }) => {
    const {timerRunning, time, reset, currentWorkSessionId} = useSelector(state => state.timer);
    const [countDownId, setCountDownId] = useState(null);
    
    
   const dispatch = useDispatch();

    useEffect(() => {
        const id = new Date().getTime().toString();
        setCountDownId(id);
        
    }, [time, reset]);

    const handleStopTimer = async id => {
        try {
            await dispatch(patchStopTimer(id));
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <View style={styles.timerBubbleContainer} >
             <CountDown
                id={countDownId}
                size={40}
                until={time}
                style={styles.timer}
                onFinish={() => handleStopTimer(currentWorkSessionId)}
                digitStyle={{width: 50}}
                digitTxtStyle={{color: 'white'}}
                separatorStyle={{color: "white"}}
                timeToShow={['H', 'M', 'S']}
                timeLabels={{m: null, s: null}}
                showSeparator
                running={timerRunning}
                onPress={() => dispatch(openPicker())}
                onChange={(value) => dispatch(setCurrentTime(value))}
            />
            <TimerAnimation
                backWaveStyle={backWaveStyle}
                frontWaveStyle={frontWaveStyle}
                riseAnimationStyle={riseAnimationStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    timer: {
        zIndex: 2,
        fontSize: 60,
        position: 'absolute',
        alignSelf: 'center',
        marginTop: height / 4 - 70,
        color: 'white',
        width: 180,
    },
    timerBubbleContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        width: 300,
        height: 300,
        borderRadius: 150,
        overflow: 'hidden',
        backgroundColor: '#F2986B',
    },
});

export default TimerBubble;