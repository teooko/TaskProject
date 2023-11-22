import {Button, Text, View} from "react-native";
import Page from "../Page";
import React from "react";

function Home({ navigation }) {
    return (
        <View>
            <Page navigation={navigation}>
                <Text>
                    HOMEEE
                </Text>
            </Page>
        </View>
    );
}

export default Home