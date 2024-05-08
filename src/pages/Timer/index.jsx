import {View, Text, StatusBar, Button} from 'react-native';
import Page from '../Page';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
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
import CountDown from "react-native-countdown-fixed";
import useTimerAnimation from "../../hooks/useTimerAnimation";

function Timer({navigation}) {
    const {start, pause} = icons;
    const [svg, setSvg] = useState(start);

    const dispatch = useDispatch();
    const {currentTaskId, time, reset, timerRunning, currentWorkSessionId} = useSelector(state => state.timer);
    const [ws, setWs] = useState(null);
    const addFriend = () => {
        setWs(new WebSocket('ws://192.168.100.8:8080'));
    }

    const sendMsg = () => {
        ws.send("mesaj");
    }
    
    const {startTimerAnimation, stopTimerAnimation, resetTimerAnimation, frontWaveStyle, backWaveStyle, riseAnimationStyle} = useTimerAnimation();
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
            // TODO: get rid of 'dispatch' as we use it everywhere
            dispatch(startTimer());
            await handleStartTimer(currentTaskId);
            startTimerAnimation();
            setSvg(pause);
        } else {
            dispatch(stopTimer());
            stopTimerAnimation();
            await handleStopTimer(currentWorkSessionId);
            setSvg(start);
        }
    };

    const handleReset = () => {
        resetTimerAnimation();
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
    }, [time, reset]);
    
    useEffect(() => {
        if(ws !== null) {
            const serverMessagesList = [];
            ws.onopen = () => {
                ws.send('something');
            };
            ws.onclose = (e) => {
            };
            ws.onerror = (e) => {
                console.log(e.message);
            };
            ws.onmessage = async (e) => {
                if(e.data === "press timer") {
                    await handlePress();
                };
                console.log(e.data);
            };
        }
    }, [ws, timerRunning]);
    
    return (
        <View>
            <View style={{display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "black", height: "100%", width: "100%", position: "absolute", zIndex: orientation === "PORTRAIT" ? -2 : 3}}>
                <StatusBar hidden={orientation !== "PORTRAIT"}/>
                <CountDown
                    id={countDownId}
                    size={100}
                    until={time}
                    style={styles.timer}
                    onFinish={() => handleStopTimer(currentWorkSessionId)}
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
                    <Button title={"send msg"}  onPress={() => sendMsg()} />
                    <Button title={"ADD FRIEND"} onPress={() => addFriend()}/>
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
