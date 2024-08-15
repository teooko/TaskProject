import React, {useEffect, useState} from 'react';
import Picker from "./Picker";
import SelectTask from "./SelectTask";
import Title from "./Title";
import {Dimensions, Image, Pressable, StyleSheet, Text, View} from "react-native";
import TimerBubble from "./TimerBubble";
import {triggerInvitationModal} from "../../store/webSocketSlice";
import {SvgXml} from "react-native-svg";
import {icons} from "../../assets/Icons";
import TimerControls from "./TimerControls";
import Page from "../Page";
import {useDispatch, useSelector} from "react-redux";
import {usePatchStopTimeStampMutation, usePostStartTimeStampMutation} from "../../store/api";
import useTimerAnimation from "../../hooks/useTimerAnimation";
import {setIsBreak, setReset, setTime, setWorkSessionId, startTimer, stopTimer} from "../../store/timerSlice";
import {Notifier} from "react-native-notifier";
import {Easing} from "react-native-reanimated";

const {height, width} = Dimensions.get('window');
const VerticalTimer = ({navigation}) => {
    const {start, pause} = icons;
    const [svg, setSvg] = useState(start);
    const dispatch = useDispatch();
    const {currentTaskId, timerRunning, currentWorkSessionId, isBreak, breakTime, workingTime} = useSelector(state => state.timer);

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

    return (
        <Page navigation={navigation}>
            <Picker/>
            <SelectTask />
            <Title isBreak={isBreak} />
            <View style={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: height - 180}}>
                <TimerBubble
                    backWaveStyle={backWaveStyle}
                    frontWaveStyle={frontWaveStyle}
                    riseAnimationStyle={riseAnimationStyle}
                />
                <Pressable style={styles.addFriendsButton} onPress={() => dispatch(triggerInvitationModal())}>
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
export default VerticalTimer;