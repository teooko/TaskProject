import {Pressable, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {deleteTask} from "../../store/tasksSlice";
import {SvgXml} from "react-native-svg";
import {icons} from "../../assets/Icons";
import * as React from "react";
import LinearGradient from "react-native-linear-gradient";

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
        <View style={{...styles.task, backgroundColor: color}} >
            <View style={styles.taskTitle}>
                <SvgXml xml={icons.chevronRight} width={'15'} height={'15'} style={styles.icon}/>
                <Text style={styles.taskName}>
                    {name}
                </Text>
            </View>
            <Text style={{...styles.changeColor}}>Change color</Text>
            <View style={styles.taskButtons}>
                <Pressable style={styles.deleteTask} onPress={() => handleDeleteTask(id)}>
                    <SvgXml xml={icons.x} width={'15'} height={'15'} style={styles.icon}/>
                </Pressable>
            </View>
        </View>
            
    )
}

const styles = StyleSheet.create({
    task: {
        height: 55,
        shadowColor: '#DF5454',                // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.1,                // Shadow opacity
        shadowRadius: 3,                    // Shadow radius
        elevation: 3,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        padding: 10,
        
    },
    changeColor: {
        fontSize: 15,
        color: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20, 
        borderWidth: 1, 
        borderColor: "white", 
        padding: 6
    },
    taskName: {
        paddingLeft: 5,
        fontSize: 15,
        color: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    taskColor: {
        width: 60,
        height: 30,
        borderRadius: 15,
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
        fill: "white",
    },
    taskTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})

export default TaskListItem;