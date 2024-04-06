import AnimatedWave from './AnimatedWave';
import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';


const TimerAnimation = ({
    backWaveStyle,
    frontWaveStyle,
    riseAnimationStyle,
}) => {
    return (
            <Animated.View style={riseAnimationStyle}>
                <AnimatedWave animatedStyle={backWaveStyle} color={'#DF5454'} />
                <AnimatedWave
                    animatedStyle={frontWaveStyle}
                    color={'#B83838'}
                />
            </Animated.View>
    );
};

export default TimerAnimation;
