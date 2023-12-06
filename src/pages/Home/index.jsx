import {View} from "react-native";
import Page from "../Page";
import React from "react";
import {StyleSheet} from "react-native";
import Calendar from "./Calendar";
import DailyActivity from "./DailyActivity";

const Home = ({ navigation }) => {
    return (
            <Page navigation={navigation}>
                <View style={styles.container}>
                    <Calendar />
                    <DailyActivity />
                </View>
            </Page>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        
        flexGrow: 1
    },
})
export default Home