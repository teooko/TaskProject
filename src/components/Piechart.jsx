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
                height={220}
                paddingLeft={(Dimensions.get('window').width/4).toString()}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}
                accessor="population"
                backgroundColor="transparent"
                marginLeft="50%"
                marginRight="50%"
                absolute
                fromZero
            />
        </View>
    )
}
const styles = StyleSheet.create({
    pieChart: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"
    }
})
export default Piechart;