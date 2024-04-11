import React, {useEffect, useState} from 'react';
import Page from "../Page";
import {Dimensions, View, Text} from "react-native";
import {BarChart, LineChart} from "react-native-chart-kit";
import {SelectList} from "react-native-dropdown-select-list/index";
import {useDispatch, useSelector} from "react-redux";
import MonthlyChart from "./MonthlyChart";

const Statistics = ({navigation}) => {

    const {tasks} = useSelector(state => state.tasks);

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };

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
            <BarChart
               // style={{color: "blue"}}
                data={data}
                width={Dimensions.get("window").width}
                height={220}
                yAxisLabel="$"
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                verticalLabelRotation={30}
            />
        </Page>
    );
};

export default Statistics;