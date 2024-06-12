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

    return Math.floor(parsedHours * 60 + parsedMinutes + (parsedSeconds / 60));
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
    const {bearerToken} = useSelector(state => state.account);
    useEffect(() => {
        dispatch(fetchTotalTasksTime({bearerToken}));
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
            width={Dimensions.get("window").width * 0.95}
            height={220}
            yAxisSuffix="min"
            chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#E97C6F",
                backgroundGradientTo: "#FFC165",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
            }}
            style={{
                marginVertical: 8,
                borderRadius: 16,
                alignSelf: "center",
            }}
            verticalLabelRotation={0}
        />
    );
};

export default TotalTaskTimeChart;