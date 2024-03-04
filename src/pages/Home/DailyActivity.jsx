import {Button, Dimensions, Pressable, StyleSheet, Text, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import React from "react";
import Piechart from "../../components/Piechart";
import TaskList from "./TaskList";

const DailyActivity = ({tasks}) => {
    console.log(tasks);
    return (
        <LinearGradient colors={['#E97C6F', '#FFC165']} style={styles.dailyActivity}>
            <Text style={styles.dailyActivityLabel}>
                Today's Activity
            </Text>
            <Text style={styles.timeLabel}>
                X hours and Y minutes
            </Text>
            <Piechart />
            
            <TaskList tasks={tasks}/>
            <Pressable style={styles.addTaskButton}>
                <Text style={styles.taskButtonText}>
                    Add Task
                </Text>
            </Pressable>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    dailyActivity: {
        flexGrow: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 20,
        paddingLeft: 20,
        paddingRight: 10,
        paddingBottom: 60
    },
    dailyActivityLabel: {
        fontSize: 22,
        color: "white",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10
    },
    timeLabel: {
        fontSize: 18,
        color: "white",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 5
    },
    addTaskButton: {
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: "#DF5454",
        position: "absolute",
        bottom: 10,
        marginTop: 20,
        alignSelf: "center",
    },
    taskButtonText: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 15,
        color: "white",
    }
})

export default DailyActivity;