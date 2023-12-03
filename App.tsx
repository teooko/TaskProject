import * as React from 'react';
import {View, Text, Button, StyleSheet, Pressable} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import Home from "./src/pages/Home";
import Timer from "./src/pages/Timer";
import {icons} from "./src/assets/Icons";
import {SvgXml} from "react-native-svg";
function CustomDrawerContent(props) {
    
    return (
        <DrawerContentScrollView {...props} >
            <Pressable onPress={() => props.navigation.navigate('Home')}>
                <SvgXml xml={icons.house} width="20" height="20"></SvgXml>
                <Text>
                    Home
                </Text>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate('Timer')}>
                <SvgXml xml={icons.clock} width="20" height="20"></SvgXml>
                <Text>
                    Timer
                </Text>
            </Pressable>
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
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }}
                          
            drawerContent={(props) => <CustomDrawerContent {...props} />}
                          
        >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Timer" component={Timer} />
        </Drawer.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer theme={MyTheme}>
            <MyDrawer />
        </NavigationContainer>
    );
}

const MyTheme = {
    dark: true,
    colors: {
        primary: 'white',
        background: 'white',
        card: '#DF5454',
        text: 'black',
        border: 'green',
        notification: 'yellow',
    },
};
