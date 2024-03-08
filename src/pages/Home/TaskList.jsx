import {StyleSheet, View} from "react-native";
import React from "react";
import TaskListItem from "./TaskListItem";
import {useSelector} from "react-redux";


const TaskList = () => {

    const status = useSelector(state => state.tasksReducer.status);
    const {tasks} = useSelector(state => state.tasksReducer);
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