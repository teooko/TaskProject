import AnimatedWave from "./AnimatedWave";
import {StyleSheet, View} from "react-native";
import React from "react";

const TimerAnimation = ({backWaveStyle, frontWaveStyle}) => {
    return (
        <View style={styles.animationContainer}>
            <AnimatedWave animatedStyle={backWaveStyle} color={"#DF5454"} />
            <AnimatedWave animatedStyle={frontWaveStyle} color={"#B83838"} />
        </View>
    )
}
const styles = StyleSheet.create({
    animationContainer: {
        top: 100,
        left: 80,
        width: 250,
        height: 250,
        borderRadius: 150,
        overflow: "hidden",
        backgroundColor: "#FFC165"
    }
})

export default TimerAnimation;