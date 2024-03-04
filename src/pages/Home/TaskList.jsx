import {StyleSheet, Text, View} from "react-native";
import React from "react";
import TaskListItem from "./TaskListItem";
import {useSelector} from "react-redux";

const TaskList = ({tasks}) => {

    const status = useSelector(state => state.tasksReducer.status)
    return (
        <View style={styles.taskList}>
            {status !== "loading" && status !== "failed" ? tasks.map(task => <TaskListItem key={task.id ? task.id : task.$id} task={task} />) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    taskList: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        justifyContent: "center",

    }
})
export default TaskList;