import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {SvgXml} from "react-native-svg";
import {icons} from '../../assets/Icons';
const TaskListItem = ({task}) => {
    {
        return ( 
            <View style={styles.taskListItem}>
                <SvgXml xml={icons.circle} width={20} height={20} fill={task.color}/>
                <Text style={styles.taskListItemName}>
                    {task.name}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    taskListItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    taskListItemName: {
        fontSize: 18,
        color: "#560D0D",
        marginLeft: 5,
    }
})
export default TaskListItem;