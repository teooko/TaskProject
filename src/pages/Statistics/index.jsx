import React, {useEffect, useState} from 'react';
import Page from "../Page";
import {Dimensions, View, Text} from "react-native";
import {LineChart} from "react-native-chart-kit";
import {SelectList} from "react-native-dropdown-select-list/index";
import {useDispatch, useSelector} from "react-redux";
import {constants} from "../../components/ScrollingCalendar/constants";
import {fetchHalfYearTime} from "../../store/tasksSlice";

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
    const {tasks, halfYearTime} = useSelector(state => state.tasks);
    const {month} = useSelector(state => state.calendar);
    const dispatch = useDispatch();
    const [data, setData] = useState([0, 0, 0, 0, 0, 0]);
    
    useEffect(() => {
        dispatch(fetchHalfYearTime());
        console.log(halfYearTime.map(month => month.time) );
    }, [])

    useEffect(() => {
        const newData = [...data];
        halfYearTime.map(month => {
            const hours = convertTimeStringToHours(month.time);
            newData[month.monthNumber + 1] = hours;
        })
        setData(newData);
    }, [halfYearTime]);
    
    let lastMonths = [];
    for(let i = 5; i >= 0; i--)
    {
        if(month - i < 0)
        {
            lastMonths.push(12 + (month - i))
        }
        else
        {
            lastMonths.push(month - i)
        }
        
    }
    let lastMonthsNames = lastMonths.map(month => constants.months[month]);
    return (
        <Page navigation={navigation}>
            <View style={{position: "absolute", top: 40, left: 30, width: 300, zIndex: 1}}>
                <SelectList dropdownItemStyles={{backgroundColor: "#B83838"}}
                            boxStyles={{backgroundColor: "#B83838", borderWidth: 0}}
                            dropdownStyles={{backgroundColor: "#B83838", borderColor: "#560D0D"}}
                            data={tasks.map(task => ({ key: task.id, value: task.name }))}
                            setSelected={(val) => console.log(val)}/>
            </View>
            {data && <View style={{marginTop: 70}}>
                <Text>Bezier Line Chart</Text>
                <LineChart
                    data={{
                        labels: lastMonthsNames,
                        datasets: [
                            {
                                data: data
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={220}
                    yAxisSuffix="h"
                    yAxisInterval={1} // optional, defaults to 1
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
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>}
        </Page>
    );
};

export default Statistics;