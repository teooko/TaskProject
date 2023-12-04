import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawer from "./src/pages/Page/CustomDrawer";


export default function App() {
    return (
        <NavigationContainer theme={MyTheme}>
            <CustomDrawer/>
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
