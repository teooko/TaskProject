import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Store, {persistor} from './src/store';
import {PersistGate} from "redux-persist/integration/react";
import WithAuthentication from "./src/authentication/Authentication/WithAuthentication";

export default function App() {
    
    // TODO: Make WithAuthentication a wrapper
    return (
        <Provider store={Store}>
            <NavigationContainer theme={theme}>
                <PersistGate loading={null} persistor={persistor}>
                    <WithAuthentication/>
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
