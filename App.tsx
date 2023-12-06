import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawer from "./src/pages/Page/CustomDrawer";

export default function App() {
    return (
        <NavigationContainer theme={theme}>
            <CustomDrawer/>
        </NavigationContainer>
    );
}

const theme = {
    dark: true,
    colors: {
        primary: 'white',
        background: 'white',
        card: '#DF5454',
        text: 'white',
        border: 'white',
        notification: 'white',
    },
};

