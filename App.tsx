import React from 'react';
import {SafeAreaView, Text} from "react-native";
import Page from "./src/pages/Page";

const App = () => {

  return (
    <SafeAreaView>
        <Page>
            <Text>
                Hello
            </Text>
        </Page>
    </SafeAreaView>
  );
}


export default App;
