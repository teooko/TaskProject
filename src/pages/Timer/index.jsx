﻿import {View, Text, Dimensions, SectionList, StatusBar} from 'react-native';
import Page from '../Page';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import UseTimer from '../../hooks/useTimer';
import UseAnimatedWave from '../../hooks/useAnimatedWave';
import useAnimatedRise from '../../hooks/useAnimatedRise';
import {icons} from '../../assets/Icons';
import TimerControls from './TimerControls';
import {useDispatch, useSelector} from 'react-redux';
import {
    openPicker,
    patchStopTimer,
    postStartTimer,
    setCurrentTaskId, setCurrentTime,
    setReset,
    startTimer,
    stopTimer
} from '../../store/timerSlice';
import {SelectList} from "react-native-dropdown-select-list/index";
import TimerBubble from "./TimerBubble";
import Picker from "./Picker";
import useOrientation from "../../helpers/useOrientation";
import {State} from "react-native-gesture-handler";
import CountDown from "react-native-countdown-fixed";

const {height, width} = Dimensions.get('window');
function Timer({navigation}) {
    const {start, pause} = icons;
    const [svg, setSvg] = useState(start);
    
    const {time, timerRunning, reset} = useSelector(state => state.timer);
    const [frontWaveStyle, startFrontAnimation, stopFrontAnimation] =
        UseAnimatedWave(0, 100, 1000);
    const [backWaveStyle, startBackAnimation, stopBackAnimation] =
        UseAnimatedWave(0, -100, 1700);
    const [riseAnimationStyle, startRise, stopRise, resetRise] =
        useAnimatedRise(time * 1000);

    const dispatch = useDispatch();
    const currentWorkSessionId = useSelector(state => state.timer.currentWorkSessionId);
    const {currentTaskId} = useSelector(state => state.timer);
    const handleStartTimer = async id => {
        try {
            await dispatch(postStartTimer(id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleStopTimer = async id => {
        try {
            await dispatch(patchStopTimer(id));
        } catch (error) {
            console.error(error);
        }
    };
    const handlePress = async () => {
        if (!timerRunning) {
            dispatch(startTimer());
            await handleStartTimer(currentTaskId);
            startFrontAnimation();
            startBackAnimation();
            startRise();
            setSvg(pause);
        } else {
            dispatch(stopTimer());
            stopRise();
            stopFrontAnimation();
            stopBackAnimation();
            await handleStopTimer(currentWorkSessionId);
            setSvg(start);
        }
    };

    const handleReset = () => {
        stopFrontAnimation();
        stopBackAnimation();
        resetRise();
        dispatch(setReset());
        dispatch(stopTimer());
        setSvg(start);
    };
    
    const {tasks} = useSelector(state => state.tasks);
    const {orientation} = useSelector(state => state.deviceInfo);
    useOrientation();
    useEffect(() => console.log("orientation changed"), [orientation]);

    const [countDownId, setCountDownId] = useState(null);

    useEffect(() => {
        const id = new Date().getTime().toString()
        setCountDownId(id)
    }, [time, reset])

    return (
        <View>
            <View style={{display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "black", height: "100%", width: "100%", position: "absolute", zIndex: orientation === "PORTRAIT" ? -2 : 3}}>
                <StatusBar />
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
            </View>
    <Page navigation={navigation}>
        <Picker/>
        <View style={{position: "absolute", top: 40, left: 30, width: 300, zIndex: 1}}>
            <SelectList dropdownItemStyles={{backgroundColor: "#B83838"}}
                        boxStyles={{backgroundColor: "#B83838", borderWidth: 0}}
                        dropdownStyles={{backgroundColor: "#B83838", borderColor: "#560D0D"}}
                        data={tasks.map(task => ({key: task.id, value: task.name}))}
                        setSelected={(val) => dispatch(setCurrentTaskId(val))}/>
        </View>
        <Text style={{fontSize: 30, color: "white", marginTop: 70, marginLeft: "auto", marginRight: "auto"}}>
            Time to work
        </Text>
        <TimerBubble
            backWaveStyle={backWaveStyle}
            frontWaveStyle={frontWaveStyle}
            riseAnimationStyle={riseAnimationStyle}
        />
        <TimerControls
            svg={svg}
            handleReset={handleReset}
            handlePress={handlePress}
        />
    </Page>
        </View>
);
}

const styles = StyleSheet.create({
    timer: {
        zIndex: 2,
        fontSize: 60,
        marginLeft: "auto",
        marginRight: "auto",
        alignSelf: "center",
        width: 180,
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
});
export default Timer;
