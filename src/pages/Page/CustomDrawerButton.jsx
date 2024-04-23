import {SvgXml} from 'react-native-svg';
import {Pressable, Text} from 'react-native';
import * as React from 'react';
import {StyleSheet} from 'react-native';

const CustomDrawerButton = ({doExtra, page, icon, props}) => {
    
    const handlePress = () => {
        if(doExtra)
            doExtra();
        props.navigation.navigate(page);
    }
    return (
        <Pressable
            onPress={handlePress}
            style={styles.button}>
            <SvgXml xml={icon} width="20" height="20" style={styles.icon} />
            <Text style={styles.label}>{page}</Text>
        </Pressable>
    );
};

export default CustomDrawerButton;

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'row',
        height: 40,
    },
    icon: {
        fill: 'white',
    },
    label: {
        marginLeft: 10,
        color: 'white',
    },
});
