import React, {useEffect} from 'react';
import {PieChart} from 'react-native-chart-kit';
import {Dimensions, Text, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useGetDailyTasksQuery} from "../store/api";

const Piechart = () => {
    const {selectedDate} = useSelector(state => state.tasks);
    const {data: dailyTasks, error, isLoading} = useGetDailyTasksQuery(selectedDate)

    return (
        <View style={styles.pieChart}>
            {!isLoading ? <PieChart
                hasLegend={false}
                data={dailyTasks}
                width={Dimensions.get('window').width - 16}
                height={240}
                paddingLeft={(Dimensions.get('window').width / 4).toString()}
                chartConfig={{
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="seconds"
                backgroundColor="transparent"
                absolute
                fromZero
            /> : <Text>Se incarca boss</Text>}
        </View>
    );
};
const styles = StyleSheet.create({
    pieChart: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 240,
    },
});
export default Piechart;
