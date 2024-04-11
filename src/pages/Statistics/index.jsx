import React, {useEffect, useState} from 'react';
import Page from "../Page";
import {Dimensions, View, Text} from "react-native";
import {BarChart, LineChart} from "react-native-chart-kit";
import {SelectList} from "react-native-dropdown-select-list/index";
import {useDispatch, useSelector} from "react-redux";
import MonthlyChart from "./MonthlyChart";
import {fetchHalfYearTime, fetchTotalTasksTime} from "../../store/tasksSlice";

//extract this function to its own file
function convertTimeStringToHours(timeString) {
    // Split the time string into components
    const [hours, minutes, seconds] = timeString.split(':');

    // Parse hours, minutes, and seconds
    const parsedHours = parseInt(hours, 10);
    const parsedMinutes = parseInt(minutes, 10);
    const parsedSeconds = parseFloat(seconds); // Parse seconds as float for decimal precision

    // Calculate total hours
    const totalHours = parsedHours + (parsedMinutes / 60) + (parsedSeconds / 3600);

    return totalHours;
}
const Statistics = ({navigation}) => {
    
    const {tasks} = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    const [data, setData] = useState({
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99]
            }
        ]
    });
    const {totalTasksTime} = useSelector(state => state.tasks);

    useEffect(() => {
        dispatch(fetchTotalTasksTime());
        //console.log(halfYearTime.map(month => month.time) );
    }, [])

    useEffect(() => {
        const labels = totalTasksTime.map(task => task.name);
        const data = totalTasksTime.map(task => convertTimeStringToHours(task.time));
        const newData = {
            labels: labels,
            datasets: [
                {
                    data: data
                }
            ]
        };
        setData(newData);
    }, [totalTasksTime]);
    

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
                yAxisSuffix="h"
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