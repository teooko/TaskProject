import Animated from "react-native-reanimated";
import {StyleSheet, View} from "react-native";
import React from "react";
import Wave from "./Wave";

const AnimatedWave = ({animatedStyle, color}) => {
    
    return (
        <View style={{...styles.wave, backgroundColor: color }}>
            <Animated.View style={animatedStyle} >
                <Wave color={color} />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    wave: {
        width: 300,
        height: 300,
        position: "absolute"
    }
})
export default AnimatedWave;