﻿import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import Home from '../Home';
import Timer from '../Timer';
import * as React from 'react';
import Tasks from '../Tasks';
import Test from '../Test';

const Drawer = createDrawerNavigator();
const CustomDrawer = () => {
    return (
        <Drawer.Navigator
            drawerContent={CustomDrawerContent}
            screenOptions={{
                headerShown: false,
                swipeEdgeWidth: 5,
                swipeMinDistance: 50,
            }}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Timer" component={Timer} />
            <Drawer.Screen name="Tasks" component={Tasks} />
            <Drawer.Screen name="Test" component={Test} />
        </Drawer.Navigator>
    );
};

export default CustomDrawer;
