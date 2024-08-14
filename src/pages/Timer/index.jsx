import {
    View,
    Text,
    StatusBar,
    Button,
    Pressable,
    Image,
    Dimensions,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
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
    setCurrentTaskId, setCurrentTime, setIsBreak,
    setReset, setTime, setWorkSessionId,
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
import {Notifier} from "react-native-notifier";
import {Easing} from "react-native-reanimated";
import {useGetTasksQuery, usePatchStopTimeStampMutation, usePostStartTimeStampMutation} from "../../store/api";
import {patch} from "axios";
import HorizontalTimer from "./HorizontalTimer";

const {height, width} = Dimensions.get('window');
function Timer({navigation}) {
    const {start, pause} = icons;
    const [svg, setSvg] = useState(start);
    const roomWs = useWebSocket();
    const dispatch = useDispatch();
    const {currentTaskId, time, reset, timerRunning, currentWorkSessionId, isBreak, breakTime, workingTime} = useSelector(state => state.timer);
    const {users, userIds} = useSelector(state => state.webSocket);
    const sessionTitles = {
        work: "Time to work",
        break: "Time to take a break"
    }
    
    const [postStartTimeStamp, result] = usePostStartTimeStampMutation();
    const [patchStopTimeStamp] = usePatchStopTimeStampMutation();
    
    const {startTimerAnimation, stopTimerAnimation, resetTimerAnimation, frontWaveStyle, backWaveStyle, riseAnimationStyle} = useTimerAnimation();
    useEffect(() => {
        if(result.data !== undefined)
            dispatch(setWorkSessionId(result.data.id));
    }, [result]);
    const handleStartTimer = async id => {
        try {
            await postStartTimeStamp(id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleStopTimer = async id => {
        try {
            await patchStopTimeStamp(id);
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleTimerFinished = () => {
        handleStopTimer(currentWorkSessionId);
        handleSkip();
    }
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
    
    const {data: tasks, isLoading, error} = useGetTasksQuery();
    const {orientation} = useSelector(state => state.deviceInfo);
    useOrientation();
    const [countDownId, setCountDownId] = useState(null);

    useEffect(() => {
        const id = new Date().getTime().toString()
        setCountDownId(id)
    }, [time, reset]);

    const handleSkip = async () => {
        if (timerRunning) {
            dispatch(stopTimer());
            stopTimerAnimation();
            setSvg(start);
        }
        if(isBreak) {
            Notifier.showNotification({
                title: 'Timer',
                description: 'Your break time has ended. Time to work.',
                duration: 4000,
                showAnimationDuration: 800,
                showEasing: Easing.bounce,
                onHidden: () => console.log('Hidden'),
                onPress: () => console.log('Press'),
                hideOnPress: false,
                componentProps: {
                    containerStyle: {
                        backgroundColor: "#FFC165",
                    },
                    titleStyle: {
                        color: "#DF5454",
                        fontWeight: "bold",
                        alignSelf: "center"
                    },
                    descriptionStyle: {
                        color: "#DF5454",
                        alignSelf: "center"
                    }
                }
            });
            dispatch(setTime(workingTime));
        }
        else {
            Notifier.showNotification({
                title: 'Timer',
                description: 'Your pomodoro session has ended. Time for a break.',
                duration: 4000,
                showAnimationDuration: 800,
                showEasing: Easing.bounce,
                onHidden: () => console.log('Hidden'),
                onPress: () => console.log('Press'),
                hideOnPress: false,
                componentProps: {
                    containerStyle: {
                        backgroundColor: "#FFC165",
                    },
                    titleStyle: {
                        color: "#DF5454",
                        fontWeight: "bold",
                        alignSelf: "center"
                    },
                    descriptionStyle: {
                        color: "#DF5454",
                        alignSelf: "center"
                    }
                }
            });
            dispatch(setTime(breakTime));
        }
        
        resetTimerAnimation();
        dispatch(setIsBreak(!isBreak));
        await handleStopTimer(currentWorkSessionId);
    };
    const {userName} = useSelector(state => state.account);
    return (
        <ScrollView style={{flex: 1, height: "100%"}} contentContainerStyle={{ flexGrow: 1 }}>
            <HorizontalTimer countDownId={countDownId} 
                             orientation={orientation} 
                             handleTimerFinished={handleTimerFinished} 
                             time={time}
                             timerRunning={timerRunning}/>
                <Page navigation={navigation}>
                    <Picker/>
                    <View style={{position: "absolute", top: 40, left: width / 2 - 150, width: 300, zIndex: 1}}>
                        <SelectList dropdownItemStyles={{backgroundColor: "#B83838", color: "white"}}
                                    boxStyles={{backgroundColor: "#B83838", borderWidth: 0, color: "white"}}
                                    inputStyles={{color: "#EAC4C4"}}
                                    dropdownTextStyles={{color: "#EAC4C4"}}
                                    dropdownStyles={{backgroundColor: "#B83838", borderColor: "#560D0D", color: "#A600E8"}}
                                    data={tasks.map(task => ({key: task.id, value: task.name}))}
                                    setSelected={(val) => dispatch(setCurrentTaskId(val))}/>
                    </View>
                    <Text style={{fontSize: 30, color: "white", marginTop: 70, marginLeft: "auto", marginRight: "auto"}}>
                        {isBreak ? sessionTitles.break : sessionTitles.work}
                    </Text>
                    <View style={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: height - 180}}>
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
                        handleSkip={() => {
                            handleSkip();
                        }}
                        handleReset={() => {
                            handleReset();
                        }}
                        handlePress={() => {
                            handlePress();
                        }}
                    />
                    </View>
                </Page>
        </ScrollView>
);
}

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
export default Timer;
