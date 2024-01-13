import {StyleSheet, Text, View} from "react-native";
import React from "react";
import ScrollingCalendar from "../../components/ScrollingCalendar";

const Calendar = () => {
    return (
        <View style={styles.calendar}>
                <ScrollingCalendar />
        </View>
    )
}

const styles = StyleSheet.create({
    calendar: {
        width: '100%',
        height: 140,
        paddingLeft: 5,
        paddingRight: 5
    }
})
export default Calendar;