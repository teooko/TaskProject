import {StyleSheet, View} from 'react-native';
import React from 'react';
import {icons} from '../../assets/Icons';
import NavigationButton from "./NavigationButton";

const TimerControls = ({svg, handleReset, handlePress, handleSkip}) => {
    const {reset, forward} = icons;

    return (
        <View style={styles.controls}>
            <NavigationButton
                icon={forward}
                onPress={() => handleSkip()}
                size={30}
            />
            <NavigationButton
                icon={svg}
                onPress={() => handlePress()}
                size={50}
            />
            <NavigationButton
                icon={reset}
                onPress={() => handleReset()}
                size={30}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    controls: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
    },
});

export default TimerControls;
