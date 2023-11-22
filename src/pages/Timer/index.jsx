import {Button, Text, View} from "react-native";
import Page from "../Page";
import React from "react";

function Timer({ navigation }) {
    return (
        <View>
            <Page navigation={navigation}>
                <Text>
                    TIMEEER
                </Text>
            </Page>
        </View>
    );
}

export default Timer