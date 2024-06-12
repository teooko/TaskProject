import React from 'react';
import Page from "../Page";
import {StyleSheet, Text} from "react-native";
import {SelectList} from "react-native-dropdown-select-list/index";
import {useSelector} from "react-redux";
import MonthlyChart from "./MonthlyChart";
import TotalTaskTimeChart from "./TotalTaskTimeChart";

const Statistics = ({navigation}) => {
    const {tasks} = useSelector(state => state.tasks);
    
    return (
        <Page navigation={navigation}>
            <Text style={styles.title}>Statistics</Text>
            <Text style={styles.subtitle}>Monthly progress</Text>
            <MonthlyChart />
            <Text style={styles.subtitle}>Time spent on each task</Text>
            <TotalTaskTimeChart />
        </Page>
    );
};

const styles = StyleSheet.create({
    title: {
        alignSelf: "center",
        fontSize: 20,
        color: "white"
    },
    subtitle: {
        alignSelf: "center",
        fontSize: 15,
        color: "white",
        marginTop: 20,
    },
});

export default Statistics;
