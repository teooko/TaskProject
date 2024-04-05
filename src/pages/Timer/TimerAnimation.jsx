import AnimatedWave from './AnimatedWave';
import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import CountDown from "react-native-countdown-component";

const {height, width} = Dimensions.get('window');
const TimerAnimation = ({
    backWaveStyle,
    frontWaveStyle,
    riseAnimationStyle,
}) => {
    return (
        <View style={styles.animationContainer}>
            <CountDown
                size={40}
                until={100}
                style={styles.timer}
                onFinish={() => alert('Finished')}
                digitStyle={{width: 50}}
                digitTxtStyle={{color: 'white'}}
                separatorStyle={{color: "white"}}
                timeToShow={['H', 'M', 'S']}
                timeLabels={{m: null, s: null}}
                showSeparator
                running={false}
            />
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
    timer: {
        zIndex: 2,
        fontSize: 60,
        position: 'absolute',
        alignSelf: 'center',
        marginTop: height / 4 - 70,
        color: 'white',
        width: 180,
    },
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
