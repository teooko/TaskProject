import {Pressable, StyleSheet} from "react-native";
import {SvgXml} from "react-native-svg";
import * as React from "react";

const NavigationButton = ({icon}) => {
    return (
        <Pressable style={styles.button} hitSlop={{top: 15, left: 15, bottom: 15, right: 15}} onPress={() => {console.log('Pressed!')}}>
            <SvgXml xml={icon} width="20" height="20" style={styles.icon}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 20,
        width: 20,
    },
    icon: {
        fill: 'white'
    }
});

export default NavigationButton;