import {StyleSheet, View} from 'react-native';
import {icons} from '../../assets/Icons';
import * as React from 'react';
import NavigationButton from '../../components/NavigationButton';
import {useContext} from "react";
const NavigationBar = ({navigation}) => {
    const {menu, profile} = icons;
    return (
        <View style={styles.navigationBar}>
            <NavigationButton
                icon={menu}
                onPress={() => navigation.openDrawer()}
                size={20}
            />
            <NavigationButton icon={profile}
                              onPress={() => navigation.openRightDrawer()}
                              size={20} />
        </View>
    );
};

const styles = StyleSheet.create({
    navigationBar: {
        height: 40,
        width: '100%',

        paddingLeft: 10,
        paddingRight: 10,

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default NavigationBar;
