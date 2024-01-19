import {Button, View, Text} from "react-native";
import Page from "../Page";
import React from "react";
import {StyleSheet} from "react-native";
import UseTimer from "../../hooks/useTimer";
import UseAnimatedWave from "../../hooks/useAnimatedWave";
import TimerAnimation from "./TimerAnimation";
function Timer({ navigation }) {
    const {started, minutes, seconds, controlTimer} = UseTimer(2, 0);
    
    const [frontWaveStyle, startFrontAnimation] = UseAnimatedWave(0, 100, 1000);
    const [backWaveStyle, startBackAnimation] = UseAnimatedWave(0, -100, 1655);
    
    const handlePress = () => {
        startFrontAnimation();
        startBackAnimation();
    }
    
    return (
        <View>
            <Page navigation={navigation}>
                <Button title={started ? "stop" : "start"}  onPress={() => handlePress()}/>
                <TimerAnimation backWaveStyle={backWaveStyle} frontWaveStyle={frontWaveStyle} />
                <Text style={styles.timer}>
                    {minutes > 9 ? minutes : "0" + minutes} : {seconds > 9 ? seconds : "0" + seconds}
                </Text>
            </Page>
        </View>
    );
}

const styles = StyleSheet.create({
    timer: {
        zIndex: 2,
        fontSize: 60,
        position: "absolute",
        top: "40%",
        left: "30%",
        color: "white",
    }
})
export default Timer