import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import {SvgXml} from "react-native-svg";
import {icons} from "../../assets/Icons";
import {useDispatch} from "react-redux";
import {deleteTask} from "../../store/tasksSlice";

const TaskButtons = ({id}) => {
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
        <View style={styles.taskButtons}>
            <Text style={{...styles.changeColor}}>Change color</Text>
                <Pressable style={styles.deleteTask} onPress={() => handleDeleteTask(id)}>
                    <SvgXml xml={icons.x} width={'15'} height={'15'} style={styles.icon}/>
                </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
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
})


export default TaskButtons;