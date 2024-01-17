import {Button, Text, View} from "react-native";
import Page from "../Page";
import React from "react";
import {StyleSheet} from "react-native";
import UseTimer from "../../hooks/useTimer";
import Svg, {Path} from "react-native-svg";
import Animated, {
    Easing,
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from "react-native-reanimated";
import AnimatedWave from "./AnimatedWave";
function Timer({ navigation }) {
    const {started, minutes, seconds, controlTimer} = UseTimer(2, 0);
    const offset = useSharedValue(0);
    
    const style = useAnimatedProps(() => ({
        transform: [{translateX: offset.value}],
    }))
    const handlePress = () => {
        offset.value = withRepeat(withTiming(100, {duration: 1000, easing: Easing.inOut(Easing.linear)}), -1);
    }
    return (
        <View>
            <Page navigation={navigation}>
                {/*<Text style={styles.timer}>
                    {minutes > 9 ? minutes : "0" + minutes} : {seconds > 9 ? seconds : "0" + seconds}
                </Text>*/}
                <Button title={started ? "stop" : "start"}  onPress={() => handlePress()}/>
                <View style={styles.animationContainer}>
                    <AnimatedWave style={style} />
                </View>
                
            </Page>
        </View>
    );
}

const styles = StyleSheet.create({
    timer: {
        fontSize: 70,
        color: "white",
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "auto",
        marginRight: "auto",
    },
    frontWave: {
        zIndex: 2,
        backgroundColor: "blue",
        top: 50,
        width: 200,
        height: 200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 40,
        elevation: 50,
    },
    squiggly: {
        position: "absolute",
        transform: [{ scaleY: -1 }],
        bottom: 0,
    },
    squigglyTwo: {
        left: 100
    },
    squigglyThree: {
        left: -100
    },
    animationContainer: {
        top: 200,
        left: 80,
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    }
})
export default Timer