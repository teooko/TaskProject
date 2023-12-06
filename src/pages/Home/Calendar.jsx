import {StyleSheet, Text, View} from "react-native";
import React from "react";

const Calendar = () => {
    return (
        <View style={styles.calendar}>
            <Text style={styles.monthYear}>
                December 2023
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    calendar: {
        width: '100%',
        height: 140,
    },
    monthYear: {
        paddingLeft: 10
    }
})
export default Calendar;