﻿import {View, Text, StatusBar, Button, Pressable, Image} from 'react-native';
import Page from '../Page';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {icons} from '../../assets/Icons';
import TimerControls from './TimerControls';
import {useDispatch, useSelector} from 'react-redux';
import {
    openPicker,
    patchStopTimer,
    postStartTimer,
    setCurrentTaskId, setCurrentTime,
    setReset, setTime,
    startTimer,
    stopTimer
} from '../../store/timerSlice';
import {SelectList} from "react-native-dropdown-select-list/index";
import TimerBubble from "./TimerBubble";
import Picker from "./Picker";
import useOrientation from "../../helpers/useOrientation";
import CountDown from "react-native-countdown-fixed";
import useTimerAnimation from "../../hooks/useTimerAnimation";
import {SvgXml} from "react-native-svg";
import {
    addMessage,
    fetchGroupSessionData,
    getAnotherUserClaims,
    triggerInvitationModal
} from "../../store/webSocketSlice";
import {useWebSocket} from "../../services/WebSocketService";

function Timer({navigation}) {
    const {start, pause} = icons;
    const [svg, setSvg] = useState(start);
    const roomWs = useWebSocket();
    const dispatch = useDispatch();
    const {currentTaskId, time, reset, timerRunning, currentWorkSessionId} = useSelector(state => state.timer);
    const {users, userIds} = useSelector(state => state.webSocket);
    useEffect(() => {
        if(roomWs !== null) {
            roomWs.onmessage = async (e) => {
                const data = JSON.parse(e.data);
                if(e.data === 'connected')
                    dispatch(fetchGroupSessionData(roomId)).then((response) => {
                        if(response.payload.userId1)
                        {
                            dispatch(getAnotherUserClaims({bearerToken, userId: response.payload.userId1}))
                        }
                        if(response.payload.userId2)
                        {
                            dispatch(getAnotherUserClaims({bearerToken, userId: response.payload.userId2}))
                        }
                        if(response.payload.userId3)
                        {
                            dispatch(getAnotherUserClaims({bearerToken, userId: response.payload.userId3}))
                        }
                        if(response.payload.userId4)
                        {
                            dispatch(getAnotherUserClaims({bearerToken, userId: response.payload.userId4}))
                        }
                    })
                else
                {
                    try {
                        const data = JSON.parse(e.data);
                        if(data.chat)
                        {
                            dispatch(addMessage(data.chat));
                        }
                        if(data.control !== null) {
                            const num = Number(data.control.action);

                            if (data.control.action === "press timer") {
                                await handlePress();
                                dispatch(addMessage(data));
                            } else if (data.control.action === "reset timer") {
                                await handleReset();
                                dispatch(addMessage(data));
                            } else if (!isNaN(num) && Number.isInteger(num)) {
                                dispatch(setTime(num));
                                dispatch(addMessage(data));
                            }
                        }
                    }
                    catch(e) {
                        console.log(e);
                    }
                } 
            };
        }
    }, [timerRunning, userIds]);
    
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
    const [countDownId, setCountDownId] = useState(null);

    useEffect(() => {
        const id = new Date().getTime().toString()
        setCountDownId(id)
    }, [time, reset]);
    
    
    const {userName} = useSelector(state => state.account);
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
                    <Pressable style={styles.addFriendsButton} onPress={() => dispatch(triggerInvitationModal())}>
                        {
                            (userIds && users) ? userIds.map(userId => users[userId]?.userName === userName ? null : <Image style={styles.profileImages} key={userId} source={{uri: `data:image/png;base64,${users[userId]?.profilePictureBase64}`}} /> ) : null
                        }
                        <SvgXml xml={icons.userPlus} width={25} height={25} fill={"white"} />
                        <Text style={styles.buttonText}>
                            Add Friends
                        </Text>
                    </Pressable>
                    <TimerControls
                        svg={svg}
                        handleReset={() => {
                            if(roomWs !== null) {
                                roomWs.send(JSON.stringify({
                                    control:
                                        {
                                            user: userName,
                                            action: "reset timer"
                                        }
                                }));
                            }
                            handleReset();
                            dispatch(addMessage({
                                control:
                                    {
                                        user: userName,
                                        action: "reset timer"
                                    }
                            }));
                        }}
                        handlePress={() => {
                            if(roomWs !== null) {
                                roomWs.send(JSON.stringify({
                                    control:
                                        {
                                            user: userName,
                                            action: "press timer"
                                        }
                                }));
                            }
                            handlePress();
                            dispatch(addMessage({
                                control:
                                    {
                                        user: userName,
                                        action: "press timer"
                                    }
                            }));
                        }}
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
export default Timer;
