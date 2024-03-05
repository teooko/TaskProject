import {Pressable, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {deleteTask} from "../../store/tasksSlice";
import {SvgXml} from "react-native-svg";
import {icons} from "../../assets/Icons";
import * as React from "react";

const TaskListItem = ({name, id, color}) => {
    const dispatch = useDispatch();
    const handleDeleteTask = async (id) => {
        try {
            await dispatch(deleteTask(id));
        }
        catch (error)
        {
            console.error(error);
        }
    }
    return (
        <View style={styles.task}>
            <Text style={styles.taskName}>{name}</Text>
            <View style={styles.taskButtons}>
                <Pressable style={{...styles.taskColor, backgroundColor: color}} />
                <Pressable style={styles.deleteTask} onPress={() => handleDeleteTask(id)}>
                    <SvgXml xml={icons.x} width={'15'} height={'15'} style={styles.icon}/>
                </Pressable>
            </View>
        </View>
            
    )
}

const styles = StyleSheet.create({
    task: {
        padding: 10,
        marginTop: 10,
        borderColor: "#E97C6F",
        borderRadius: 5,
        borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    taskName: {
        fontSize: 15,
        color: "white"
    },
    taskColor: {
        width: 60,
        height: 30,
        borderColor: "#E97C6F",
        borderRadius: 15,
        borderWidth: 1,
    },
    taskButtons: {
        flexDirection: "row",
        alignItems: "center"
    },
    deleteTask: {
        padding: 8,
        marginLeft: 10,
    },
    icon: {
        fill: 'white',
    }
})

export default TaskListItem;