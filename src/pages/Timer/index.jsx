import {Button, View, Text, Dimensions, Pressable} from "react-native";
import Page from "../Page";
import React, {useState} from "react";
import {StyleSheet} from "react-native";
import UseTimer from "../../hooks/useTimer";
import UseAnimatedWave from "../../hooks/useAnimatedWave";
import TimerAnimation from "./TimerAnimation";
import useAnimatedRise from "../../hooks/useAnimatedRise";
import {SvgXml} from "react-native-svg";
import {icons} from "../../assets/Icons";
import NavigationButton from "../../components/NavigationButton";

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
    const handlePress = () => {
        if(!started) {
            startTimer();
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
                <View style={styles.controls}>
                        <NavigationButton icon={rest} onPress={() => handlePress()} size={40} />
                        <NavigationButton icon={svg} onPress={() => handlePress()} size={50} />
                        <NavigationButton icon={reset} onPress={() => handleReset()} size={30} />
                </View>
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