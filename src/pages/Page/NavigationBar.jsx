import {StyleSheet, View} from 'react-native';
import {icons} from '../../assets/Icons';
import * as React from 'react';
import NavigationButton from '../../components/NavigationButton';
import {useContext} from "react";
import {RightDrawerContext} from "./RightDrawer";
const NavigationBar = ({navigation}) => {
    const {menu, profile} = icons;
    return (
        <RightDrawerContext.Consumer>
            {({ openRightDrawer }) => (
                <View style={styles.navigationBar}>
                    <NavigationButton
                        icon={menu}
                        onPress={() => navigation.openDrawer()}
                        size={20}
                    />
                    <NavigationButton
                        icon={profile}
                        onPress={openRightDrawer} 
                        size={20}
                    />
                </View>
            )}
        </RightDrawerContext.Consumer>
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
