import React from 'react';
import Page from "../Page";
import {View} from "react-native";
import {SelectList} from "react-native-dropdown-select-list/index";
import {useSelector} from "react-redux";
import MonthlyChart from "./MonthlyChart";
import TotalTaskTimeChart from "./TotalTaskTimeChart";

const Statistics = ({navigation}) => {
    const {tasks} = useSelector(state => state.tasks);
    
    return (
        <Page navigation={navigation}>
            <View style={{position: "absolute", top: 40, left: 30, width: 300, zIndex: 1}}>
                <SelectList dropdownItemStyles={{backgroundColor: "#B83838"}}
                            boxStyles={{backgroundColor: "#B83838", borderWidth: 0}}
                            dropdownStyles={{backgroundColor: "#B83838", borderColor: "#560D0D"}}
                            data={tasks.map(task => ({ key: task.id, value: task.name }))}
                            setSelected={(val) => console.log(val)}/>
            </View>
            <MonthlyChart />
            <TotalTaskTimeChart />
        </Page>
    );
};

export default Statistics;
