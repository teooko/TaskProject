﻿import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View} from "react-native";
import {LineChart} from "react-native-chart-kit";
import {useDispatch, useSelector} from "react-redux";
import {fetchHalfYearTime} from "../../store/tasksSlice";
import {useGetMonthlyActivityQuery} from "../../store/api";
import {calendarNames} from "../../constants";

// TODO: extract this function to its own file


const MonthlyChart = () => {
    const {month} = useSelector(state => state.calendar);
    const {data: halfYearTime, error, isLoading} = useGetMonthlyActivityQuery();

    //TODO: Extract to own function
    let lastMonths = [];
    for(let i = 5; i >= 0; i--) {
        lastMonths.push((month - i + 12) % 12 || 12);
    }
    let lastMonthsNames = lastMonths.map(month => calendarNames.months[month]);
    
    return (
        !isLoading && <View>
            <LineChart
                data={{
                    labels: lastMonthsNames,
                    datasets: [
                        {
                            data: halfYearTime
                        }
                    ]
                }}
                width={Dimensions.get("window").width * 0.95} // from react-native
                height={200}
                yAxisSuffix="min"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#E97C6F",
                    backgroundGradientTo: "#FFC165",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
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
                    borderRadius: 16,
                    alignSelf: "center"
                }}
            />
        </View>
    );
};

export default MonthlyChart;