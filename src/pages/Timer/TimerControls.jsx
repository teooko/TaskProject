import NavigationButton from '../../components/NavigationButton';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {icons} from '../../assets/Icons';

const TimerControls = ({svg, handleReset, handlePress}) => {
    const {reset, rest} = icons;

    return (
        <View style={styles.controls}>
            <NavigationButton
                icon={rest}
                onPress={() => handlePress()}
                size={40}
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
