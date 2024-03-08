import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawer from "./src/pages/Page/CustomDrawer";
import {Provider} from "react-redux";
import Store from "./src/store";

export default function App() {
    return (
        <NavigationContainer theme={theme}>
            <Provider store={Store}>
                <CustomDrawer/>
            </Provider>
        </NavigationContainer>
    );
}

const theme = {
    dark: false,
    colors: {
        primary: 'white',
        background: 'white',
        card: '#DF5454',
        text: 'white',
        border: 'white',
        notification: 'white',
    },
};

