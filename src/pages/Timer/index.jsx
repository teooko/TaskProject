import {Button, View, Text, Dimensions} from "react-native";
import Page from "../Page";
import React from "react";
import {StyleSheet} from "react-native";
import UseTimer from "../../hooks/useTimer";
import UseAnimatedWave from "../../hooks/useAnimatedWave";
import TimerAnimation from "./TimerAnimation";
import {Easing, useAnimatedProps, useSharedValue, withTiming} from "react-native-reanimated";
import useAnimatedRise from "../../hooks/useAnimatedRise";

const { height, width } = Dimensions.get('window');
function Timer({ navigation }) {
    const {started, minutes, seconds, controlTimer} = UseTimer(0, 30);
    
    const [frontWaveStyle, startFrontAnimation, stopFrontAnimation] = UseAnimatedWave(0, 100, 1000);
    const [backWaveStyle, startBackAnimation, stopBackAnimation] = UseAnimatedWave(0, -100, 1700);
    const [riseAnimationStyle, startRise, stopRise] = useAnimatedRise(minutes * 60 * 1000 + seconds * 1000 );
    const handlePress = () => {
        if(!started) {
            controlTimer();
            startFrontAnimation();
            startBackAnimation();
            startRise();
        }
        else {
            stopFrontAnimation();
            stopBackAnimation();
            stopRise();
            controlTimer();
        }
    }
    
    return (
        <View>
            <Page navigation={navigation}>
                
                <TimerAnimation backWaveStyle={backWaveStyle} frontWaveStyle={frontWaveStyle} riseAnimationStyle = {riseAnimationStyle}/>
                <Text style={styles.timer}>
                    {minutes > 9 ? minutes : "0" + minutes} : {seconds > 9 ? seconds : "0" + seconds}
                </Text>
                <Button title={started ? "stop" : "start"}  onPress={() => handlePress()}/>
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
    }
})
export default Timer