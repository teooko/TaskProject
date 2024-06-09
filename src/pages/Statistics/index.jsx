import React from 'react';
import Page from "../Page";
import {Text} from "react-native";
import {SelectList} from "react-native-dropdown-select-list/index";
import {useSelector} from "react-redux";
import MonthlyChart from "./MonthlyChart";
import TotalTaskTimeChart from "./TotalTaskTimeChart";

const Statistics = ({navigation}) => {
    const {tasks} = useSelector(state => state.tasks);
    
    return (
        <Page navigation={navigation}>
            <Text>Statistics</Text>
            <Text>Worked most on: </Text>
            <Text>Most productive month: </Text>
            <MonthlyChart />
            <TotalTaskTimeChart />
        </Page>
    );
};

export default Statistics;
