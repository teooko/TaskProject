import {StyleSheet, View} from "react-native";
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
        paddingLeft: 5,
        paddingRight: 5
    }
})
export default Calendar;