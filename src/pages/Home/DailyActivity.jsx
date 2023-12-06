import {StyleSheet, Text} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import React from "react";

const DailyActivity = () => {
    return (
        <LinearGradient colors={['#E97C6F', '#FFC165']} style={styles.dailyActivity}>
            <Text style={styles.dailyActivityLabel}>
                Today's Activity
            </Text>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    dailyActivity: {
        width: '100%',
        height: '100%',
        
        borderRadius: 40,
    },
    dailyActivityLabel: {
        fontSize: 20,
        
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10
    }
})

export default DailyActivity;