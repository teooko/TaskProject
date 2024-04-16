import React, {useEffect, useState} from 'react';
import {Dimensions} from "react-native";
import {BarChart} from "react-native-chart-kit";
import {useDispatch, useSelector} from "react-redux";
import {fetchTotalTasksTime} from "../../store/tasksSlice";

// TODO: extract this function to its own file
function convertTimeStringToHours(timeString) {
    const [hours, minutes, seconds] = timeString.split(':');

    const parsedHours = parseInt(hours, 10);
    const parsedMinutes = parseInt(minutes, 10);
    const parsedSeconds = parseFloat(seconds);

    return parsedHours + (parsedMinutes / 60) + (parsedSeconds / 3600);
}

const TotalTaskTimeChart = () => {
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
    }, [])

    useEffect(() => {
        const labels = totalTasksTime.map(task => task.name);
        const data = totalTasksTime.map(({time}) => time).map(convertTimeStringToHours);
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
        <BarChart
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
    );
};

export default TotalTaskTimeChart;