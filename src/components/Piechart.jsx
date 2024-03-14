import React, {useEffect} from 'react';
import {PieChart} from 'react-native-chart-kit';
import {Dimensions, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const Piechart = () => {
    const {dailyTasks} = useSelector(state => state.tasks);
    const dailyStatus = useSelector(state => state.tasks.dailyStatus);

    const data = dailyTasks.map(task => ({
        name: task.name,
        seconds: task.time,
        color: task.color,
    }));

    return (
        <View style={styles.pieChart}>
            <PieChart
                hasLegend={false}
                data={data}
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
            />
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
