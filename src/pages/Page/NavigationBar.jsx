import {StyleSheet, Text, View} from "react-native";
import { SvgXml } from 'react-native-svg';
import { menu } from "../../assets/Icons";
import * as React from "react";
const NavigationBar = () => {
    return (
        <View style={styles.navigationBar}>
            <SvgXml xml={menu} width="100%" height="100%" />
            <Text>
                Hello from Nav Bar
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navigationBar: {
        height: 40,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    }
});

export default NavigationBar;
