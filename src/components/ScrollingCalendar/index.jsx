import React from "react";
import {SafeAreaView, StyleSheet} from "react-native";
import ScrollingDays from "./ScrollingDays";
import CalendarHeader from "./CalendarHeader";
const ScrollingCalendar = () => {
    return (
            <SafeAreaView style={styles.backgroundStyle}>
                <CalendarHeader />
                <ScrollingDays />
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backgroundStyle: {
        width: '100%',
    }
});
export default ScrollingCalendar;