import React from 'react';
import Page from "../Page";
import {Dimensions, View, Text} from "react-native";
import {LineChart} from "react-native-chart-kit";
import {SelectList} from "react-native-dropdown-select-list/index";
import {useSelector} from "react-redux";
import {constants} from "../../components/ScrollingCalendar/constants";

const Statistics = ({navigation}) => {
    const {tasks} = useSelector(state => state.tasks);
    const {month} = useSelector(state => state.calendar);
    
    let lastMonths = [];
    for(let i = 5; i >= 0; i--)
    {
        if(month - i < 0)
        {
            lastMonths.push(constants.months[12 + (month - i)])
        }
        else
        {
            lastMonths.push(constants.months[month - i])
        }
        
    }
    return (
        <Page navigation={navigation}>
            <View style={{position: "absolute", top: 40, left: 30, width: 300, zIndex: 1}}>
                <SelectList dropdownItemStyles={{backgroundColor: "#B83838"}}
                            boxStyles={{backgroundColor: "#B83838", borderWidth: 0}}
                            dropdownStyles={{backgroundColor: "#B83838", borderColor: "#560D0D"}}
                            data={tasks.map(task => ({ key: task.id, value: task.name }))}
                            setSelected={(val) => console.log(val)}/>
            </View>
            <View style={{marginTop: 70}}>
                <Text>Bezier Line Chart</Text>
                <LineChart
                    data={{
                        labels: lastMonths,
                        datasets: [
                            {
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100
                                ]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
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
            </View>
        </Page>
    );
};

export default Statistics;