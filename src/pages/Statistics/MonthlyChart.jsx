import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View} from "react-native";
import {LineChart} from "react-native-chart-kit";
import {useDispatch, useSelector} from "react-redux";
import {fetchHalfYearTime} from "../../store/tasksSlice";
import {constants} from "../../components/ScrollingCalendar/constants";

// TODO: extract this function to its own file
function convertTimeStringToHours(timeString) {
    // Split the time string into components
    const [hours, minutes, seconds] = timeString.split(':');

    // Parse hours, minutes, and seconds
    const parsedHours = parseInt(hours, 10);
    const parsedMinutes = parseInt(minutes, 10);
    const parsedSeconds = parseFloat(seconds); // Parse seconds as float for decimal precision

    // Calculate total hours
    const totalMinutes = parsedHours + (parsedMinutes) + (parsedSeconds / 60);

    return totalMinutes;
}

const MonthlyChart = () => {
    const {halfYearTime} = useSelector(state => state.tasks);
    const {month} = useSelector(state => state.calendar);
    const dispatch = useDispatch();
    const [data, setData] = useState([0, 0, 0, 0, 0, 0]);
    const {bearerToken} = useSelector(state => state.account);
    useEffect(() => {
        dispatch(fetchHalfYearTime({bearerToken}));
    }, [])

    useEffect(() => {
        const newData = [...data];
        halfYearTime.map(month => {
            const hours = convertTimeStringToHours(month.time);
            newData[month.monthNumber - 1] = hours;
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
        data && <View style={{marginTop: 70}}>
            <LineChart
                data={{
                    labels: lastMonthsNames,
                    datasets: [
                        {
                            data: data
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