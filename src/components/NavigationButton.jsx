import {Pressable, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import * as React from 'react';

const NavigationButton = ({icon, onPress, size}) => {
    return (
        <Pressable
            hitSlop={{top: 15, left: 15, bottom: 15, right: 15}}
            onPress={onPress}>
            <SvgXml
                xml={icon}
                width={`${size}`}
                height={`${size}`}
                style={styles.icon}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    icon: {
        fill: 'white',
    },
});

export default NavigationButton;
