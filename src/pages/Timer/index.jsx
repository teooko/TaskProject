import {Button, Text, View} from "react-native";
import Page from "../Page";
import React from "react";
import {StyleSheet} from "react-native";
import UseTimer from "../../hooks/useTimer";
function Timer({ navigation }) {
    const {started, minutes, seconds, controlTimer} = UseTimer(2, 0);
    
    return (
        <View>
            <Page navigation={navigation}>
                <Text style={styles.timer}>
                    {minutes > 9 ? minutes : "0" + minutes} : {seconds > 9 ? seconds : "0" + seconds}
                </Text>
                <Button title={started ? "stop" : "start"} onPress={() => controlTimer()}/>
            </Page>
        </View>
    );
}

const styles = StyleSheet.create({
    timer: {
        fontSize: 80,
        color: "white",
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "auto",
        marginRight: "auto",
    }
})
export default Timer