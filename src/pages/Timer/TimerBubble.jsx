import React from 'react';
import {Dimensions, StyleSheet, View} from "react-native";
import CountDown from "react-native-countdown-component";
import TimerAnimation from "./TimerAnimation";
import {useDispatch, useSelector} from "react-redux";
import {openPicker} from "../../store/timerSlice";

const {height, width} = Dimensions.get('window');
const TimerBubble = ({
                         backWaveStyle,
                         frontWaveStyle,
                         riseAnimationStyle,
                     }) => {
    
    const {timerRunning} = useSelector(state => state.timer);
   const dispatch = useDispatch(); 
    return (
        <View style={styles.timerBubbleContainer}>
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
                running={timerRunning}
                onPress={() => dispatch(openPicker())}
            />
            <TimerAnimation
                backWaveStyle={backWaveStyle}
                frontWaveStyle={frontWaveStyle}
                riseAnimationStyle={riseAnimationStyle}
            />
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
    timerBubbleContainer: {
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

export default TimerBubble;