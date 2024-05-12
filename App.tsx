import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import CustomDrawer from './src/pages/Page/CustomDrawer';
import {Provider} from 'react-redux';
import Store, {persistor} from './src/store';
import {PersistGate} from "redux-persist/integration/react";
import RightDrawer from "./src/pages/Page/RightDrawer";
import WithAuthentication from "./src/authentication/LogIn/WithAuthentication";

export default function App() {
    return (
        <Provider store={Store}>
            <NavigationContainer theme={theme}>
                <PersistGate loading={null} persistor={persistor}>
                    <WithAuthentication />
                </PersistGate>
            </NavigationContainer>
        </Provider>
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
