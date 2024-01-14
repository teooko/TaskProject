import {ScrollView} from "react-native";
import Page from "../Page";
import React from "react";
import {StyleSheet} from "react-native";
import Calendar from "./Calendar";
import DailyActivity from "./DailyActivity";

const Home = ({ navigation }) => {
    return (
            <Page navigation={navigation}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} overScrollMode={"never"} showsVerticalScrollIndicator={false}>
                    <Calendar />
                    <DailyActivity />
                </ScrollView>
            </Page>
    );
}
export default Home