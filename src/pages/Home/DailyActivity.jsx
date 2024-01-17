import {Dimensions, StyleSheet, Text, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import React from "react";
import Piechart from "../../components/Piechart";

const DailyActivity = () => {
    return (
        <LinearGradient colors={['#E97C6F', '#FFC165']} style={styles.dailyActivity}>
            <Text style={styles.dailyActivityLabel}>
                Today's Activity
            </Text>
            <Piechart />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    dailyActivity: {
        flexGrow: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    dailyActivityLabel: {
        fontSize: 20,
        color: "white",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10
    }
})

export default DailyActivity;