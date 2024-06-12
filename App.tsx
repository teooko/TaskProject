import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Store, {persistor} from './src/store';
import {PersistGate} from "redux-persist/integration/react";
import WithAuthentication from "./src/authentication/Authentication/WithAuthentication";
import { NotifierWrapper } from 'react-native-notifier';
import {GestureHandlerRootView} from "react-native-gesture-handler";
export default function App() {
    
    return (
        <Provider store={Store}>
            <NavigationContainer theme={theme}>
                    <PersistGate loading={null} persistor={persistor}>
                        <GestureHandlerRootView>
                            <NotifierWrapper>
                                <WithAuthentication/>
                            </NotifierWrapper>
                        </GestureHandlerRootView>
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
