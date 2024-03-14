import {Pressable, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import TaskTitle from './TaskTitle';
import TaskButtons from './TaskButtons';
const TaskListItem = ({name, id, color}) => {
    return (
        <View style={{...styles.task, backgroundColor: color}}>
            <TaskTitle name={name} />
            <TaskButtons id={id} />
        </View>
    );
};

const styles = StyleSheet.create({
    task: {
        height: 55,
        shadowColor: '#DF5454', // Shadow color
        shadowOffset: {width: 0, height: 2}, // Shadow offset
        shadowOpacity: 0.1, // Shadow opacity
        shadowRadius: 3, // Shadow radius
        elevation: 3,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        padding: 10,
    },
});

export default TaskListItem;
