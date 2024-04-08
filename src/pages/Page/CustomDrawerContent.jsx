import {DrawerContentScrollView} from '@react-navigation/drawer';
import {icons} from '../../assets/Icons';
import * as React from 'react';
import CustomDrawerButton from './CustomDrawerButton';
import {StyleSheet} from 'react-native';

const CustomDrawerContent = props => {
    return (
        <DrawerContentScrollView {...props} style={styles.content}>
            <CustomDrawerButton
                page={'Home'}
                icon={icons.house}
                props={props}
            />
            <CustomDrawerButton
                page={'Timer'}
                icon={icons.clock}
                props={props}
            />
            <CustomDrawerButton
                page={'Tasks'}
                icon={icons.check}
                props={props}
            />
            <CustomDrawerButton
                page={'Statistics'}
                icon={icons.chartLine}
                props={props}
            />
            <CustomDrawerButton
                page={'Test'}
                icon={icons.check}
                props={props}
            />
            {/*
            <DrawerItem
                label="Close drawer"
                onPress={() => props.navigation.closeDrawer()}
            />
            <DrawerItem
                label="Toggle drawer"
                onPress={() => props.navigation.toggleDrawer()}
            />
            */}
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    content: {
        marginLeft: 10,
        marginTop: 20,
    },
});
export default CustomDrawerContent;
