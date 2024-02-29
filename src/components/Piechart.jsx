import React from "react";
import {PieChart} from "react-native-chart-kit";
import {Dimensions, View} from "react-native";
import { StyleSheet } from "react-native";

const Piechart = () => {
    return (
        <View style={styles.pieChart}>
            <PieChart
                hasLegend={false}
                data={[
                    {
                        population: 31500000,
                        color: 'rgba(131, 167, 234, 1)'
                    },
                    {
                        name: 'Toronto',
                        population: 2800000,
                        color: '#F00',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 15,
                    },
                    {
                        name: 'New York',
                        population: 8538000,
                        color: 'purple',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 15,
                    },
                    {
                        name: 'Moscow',
                        population: 11920000,
                        color: 'rgb(0, 0, 255)',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 15,
                    },
                ]}
                width={Dimensions.get('window').width - 16}
                height={240}
                paddingLeft={(Dimensions.get('window').width/4).toString()}
                chartConfig={{
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
                }}
                accessor="population"
                backgroundColor="transparent"
                absolute
                fromZero
            />
        </View>
    )
}
const styles = StyleSheet.create({
    pieChart: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        height: 240
    }
})
export default Piechart;