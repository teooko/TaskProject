import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
const TaskListItem = ({task}) => {
    {
        return (
            <View style={styles.taskListItem}>
                <Text
                    style={{
                        ...styles.taskListItemName,
                        backgroundColor: task.color,
                    }}>
                    {task.name}
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    taskListItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    taskListItemName: {
        padding: 5,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        fontSize: 13,
        color: 'white',
        marginLeft: 5,
    },
});
export default TaskListItem;
