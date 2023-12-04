import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomDrawerContent from "./CustomDrawerContent";
import Home from "../Home";
import Timer from "../Timer";
import * as React from "react";

const Drawer = createDrawerNavigator();

const CustomDrawer = () => {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }} 
                          drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Timer" component={Timer} />
        </Drawer.Navigator>
    );
}

export default CustomDrawer;