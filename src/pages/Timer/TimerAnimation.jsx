import AnimatedWave from './AnimatedWave';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
const TimerAnimation = ({
    backWaveStyle,
    frontWaveStyle,
    riseAnimationStyle,
}) => {
    return (
        <View style={styles.animationContainer}>
            <Animated.View style={riseAnimationStyle}>
                <AnimatedWave animatedStyle={backWaveStyle} color={'#DF5454'} />
                <AnimatedWave
                    animatedStyle={frontWaveStyle}
                    color={'#B83838'}
                />
            </Animated.View>
        </View>
    );
};
const styles = StyleSheet.create({
    animationContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        width: 300,
        height: 300,
        borderRadius: 150,
        overflow: 'hidden',
        backgroundColor: '#F2986B',
    },
});

export default TimerAnimation;
