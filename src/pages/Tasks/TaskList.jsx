import {Pressable, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {deleteTask} from "../../store/tasksSlice";
import TaskListItem from "./TaskListItem";

const TaskList = () => {
    const {tasks} = useSelector(state => state.tasksReducer);
    const status = useSelector(state => state.tasksReducer.status);
    return (
        <View style={styles.taskList}>
            {
                status !== "loading" && status !== "failed" ? tasks
                    .map(task => <TaskListItem key={task.id ? task.id : task.$id} name={task.name} id={task.id ? task.id : task.$id} color={task.color} />
                ).reverse() : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    taskList: {
        paddingLeft: 20,
        paddingRight: 20,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        overflow: "hidden",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingBottom: 14
    }
})

export default TaskList;