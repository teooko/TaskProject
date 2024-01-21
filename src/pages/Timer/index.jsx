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

const { height, width } = Dimensions.get('window');
function Timer({ navigation }) {
    const {start, pause} = icons;
    const [svg, setSvg] = useState(start);
    const {started, minutes, seconds, controlTimer} = UseTimer(25, 0);
    
    const [frontWaveStyle, startFrontAnimation, stopFrontAnimation] = UseAnimatedWave(0, 100, 1000);
    const [backWaveStyle, startBackAnimation, stopBackAnimation] = UseAnimatedWave(0, -100, 1700);
    const [riseAnimationStyle, startRise, stopRise] = useAnimatedRise(minutes * 60 * 1000 + seconds * 1000 );
    const handlePress = () => {
        if(!started) {
            controlTimer();
            startFrontAnimation();
            startBackAnimation();
            startRise();
            setSvg(pause);
        }
        else {
            stopFrontAnimation();
            stopBackAnimation();
            stopRise();
            controlTimer();
            setSvg(start);
        }
    }
    
    return (
        <View>
            <Page navigation={navigation}>
                
                <TimerAnimation backWaveStyle={backWaveStyle} frontWaveStyle={frontWaveStyle} riseAnimationStyle = {riseAnimationStyle}/>
                <Text style={styles.timer}>
                    {minutes > 9 ? minutes : "0" + minutes} : {seconds > 9 ? seconds : "0" + seconds}
                </Text>
                <Pressable style={styles.button} hitSlop={{top: 15, left: 15, bottom: 15, right: 15}} onPress={() => handlePress()}>
                    <SvgXml xml={svg} width="40" height="40" style={styles.icon}/>
                </Pressable>
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
        marginTop: height / 2 - 50,
        color: "white",
        width: 180
    },
    icon: {
        fill: "white"
    },
    button: {
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 30,
        width: 20,
        height: 20,
    }
})
export default Timer