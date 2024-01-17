import Animated from "react-native-reanimated";
import Svg, {Path} from "react-native-svg";
import {StyleSheet, View} from "react-native";
import React from "react";

const AnimatedWave = ({style}) => {
    return (
        <View style={styles.frontWave}>
            <Animated.View style={style} >
                <Svg height="20" width="100%" style={{...styles.squiggly, ...styles.squigglyThree}}>
                    <Path
                        d="M0,10 C50,30 50,-10 100,10 L100,0 L0,0 Z"
                        fill="#B83838"
                    />
                </Svg>
                <Svg height="20" width="100%" style={{...styles.squiggly, ...styles.squigglyTwo}}>
                    <Path
                        d="M0,10 C50,30 50,-10 100,10 L100,0 L0,0 Z"
                        fill="#B83838"
                    />
                </Svg>
                <Svg height="20" width="100%" style={styles.squiggly}>
                    <Path
                        d="M0,10 C50,30 50,-10 100,10 L100,0 L0,0 Z"
                        fill="#B83838"
                    />
                </Svg>
                <Svg height="20" width="100%" style={{...styles.squiggly, ...styles.squigglyFour}}>
                    <Path
                        d="M0,10 C50,30 50,-10 100,10 L100,0 L0,0 Z"
                        fill="#B83838"
                    />
                </Svg>
                
            </Animated.View>
        </View>
    )
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
        zIndex: 2,
        backgroundColor: "#B83838",
        width: 250,
        height: 250
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
    squigglyFour: {
        left: 200
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
export default AnimatedWave;