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
    const offset2 = useSharedValue(0)
    const style = useAnimatedProps(() => ({
        transform: [{translateX: offset.value}],
    }))
    const style2 = useAnimatedProps(() => ({
        transform: [{translateX: offset2.value}],
    }))
    const handlePress = () => {
        offset.value = withRepeat(withTiming(100, {duration: 1000, easing: Easing.inOut(Easing.linear)}), -1);
        offset2.value = withRepeat(withTiming(-100, {duration: 1500, easing: Easing.inOut(Easing.linear)}), -1);
    }
    return (
        <View>
            <Page navigation={navigation}>
                {/*<Text style={styles.timer}>
                    {minutes > 9 ? minutes : "0" + minutes} : {seconds > 9 ? seconds : "0" + seconds}
                </Text>*/}
                <Button title={started ? "stop" : "start"}  onPress={() => handlePress()}/>
                <View style={styles.animationContainer}>
                    <View style={styles.frontWave}>
                        <Animated.View style={style2} >
                            <Svg height="20" width="100%" style={{...styles.squiggly, ...styles.squigglyThree}}>
                                <Path
                                    d="M0,10 C50,30 50,-10 100,10 L100,0 L0,0 Z"
                                    fill="aqua"
                                />
                            </Svg>
                            <Svg height="20" width="100%" style={{...styles.squiggly, ...styles.squigglyTwo}}>
                                <Path
                                    d="M0,10 C50,30 50,-10 100,10 L100,0 L0,0 Z"
                                    fill="aqua"
                                />
                            </Svg>
                            <Svg height="20" width="100%" style={styles.squiggly}>
                                <Path
                                    d="M0,10 C50,30 50,-10 100,10 L100,0 L0,0 Z"
                                    fill="aqua"
                                />
                            </Svg>
                        </Animated.View>
                        <AnimatedWave style={style} />
                    </View>
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
        position: "absolute",
        zIndex: 1,
        backgroundColor: "aqua",
        top: 100,
        width: 200,
        height: 200,
    },
    squiggly: {
        position: "absolute",
        transform: [{ scaleY: -1 }, { scaleX: -1 }],
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
        overflow: "hidden",
        backgroundColor: "#B53535"
    }
})
export default Timer