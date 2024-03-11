import {View, Text, Dimensions, SectionList} from "react-native";
import Page from "../Page";
import React, {useState} from "react";
import {StyleSheet} from "react-native";
import UseTimer from "../../hooks/useTimer";
import UseAnimatedWave from "../../hooks/useAnimatedWave";
import TimerAnimation from "./TimerAnimation";
import useAnimatedRise from "../../hooks/useAnimatedRise";
import {icons} from "../../assets/Icons";
import TimerControls from "./TimerControls";
import {useDispatch, useSelector} from "react-redux";
import {deleteTask} from "../../store/tasksSlice";
import {patchStopTimer, postStartTimer} from "../../store/timerSlice";

const { height, width } = Dimensions.get('window');
function Timer({ navigation }) {
    const {start, pause, reset, rest} = icons;
    const [svg, setSvg] = useState(start);
    const initialMinutes = 0;
    const initialSeconds = 30;
    
    const {started, minutes, seconds, startTimer, stopTimer, setMinutes, setSeconds} = UseTimer(initialMinutes, initialSeconds);
    
    const [frontWaveStyle, startFrontAnimation, stopFrontAnimation] = UseAnimatedWave(0, 100, 1000);
    const [backWaveStyle, startBackAnimation, stopBackAnimation] = UseAnimatedWave(0, -100, 1700);
    const [riseAnimationStyle, startRise, stopRise, resetRise] = useAnimatedRise(minutes * 60 * 1000 + seconds * 1000 );
    
    const dispatch = useDispatch();
    const currentTaskId = useSelector(state => state.timerReducer.currentTaskId);
    const handleStartTimer = async (id) => {
        try {
            await dispatch(postStartTimer(id));
        }
        catch (error)
        {
            console.error(error);
        }
    }

    const handleStopTimer = async (id) => {
        try {
            await dispatch(patchStopTimer(id));
        }
        catch (error)
        {
            console.error(error);
        }
    }
    const handlePress = async () => {
        if(!started) {
            startTimer();
            await handleStartTimer(537);
            startFrontAnimation();
            startBackAnimation();
            startRise();
            setSvg(pause);
        }
        else {
            stopRise();
            stopFrontAnimation();
            stopBackAnimation();
            stopTimer();
            await handleStopTimer(currentTaskId);
            setSvg(start);
        }
    }
    
    const handleReset = () => {
        stopFrontAnimation();
        stopBackAnimation();
        resetRise();
        stopTimer();
        setSvg(start);
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
    }
    return (
        <View>
            <Page navigation={navigation}>
                <TimerAnimation backWaveStyle={backWaveStyle} frontWaveStyle={frontWaveStyle} riseAnimationStyle = {riseAnimationStyle}/>
                <Text style={styles.timer}>
                    {minutes > 9 ? minutes : "0" + minutes} : {seconds > 9 ? seconds : "0" + seconds}
                </Text>
                <TimerControls svg={svg} handleReset={handleReset} handlePress={handlePress}/>
            </Page>
        </View>
    );
}

const styles = StyleSheet.create({
    timer: {
        zIndex: 2,
        fontSize: 60,
        position: "absolute",
        marginLeft: width / 2 - 90,
        marginTop: height / 2 - 60,
        color: "white",
        width: 180
    },
    icon: {
        fill: "white"
    },
    button: {
        marginBottom: 30,
        width: 20,
        height: 20,
    },
    controls: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 70,
    },
})
export default Timer