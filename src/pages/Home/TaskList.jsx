import {StyleSheet, View} from 'react-native';
import React from 'react';
import TaskListItem from './TaskListItem';
import {useSelector} from 'react-redux';

const TaskList = () => {
    // TODO: Add loading mechanism
    const {dailyTasks} = useSelector(state => state.tasks);
    return (
        <View style={styles.taskList}>
            {dailyTasks
                ? dailyTasks.map(task => (
                      <TaskListItem
                          key={task.id ? task.id : task.$id}
                          task={task}
                      />
                  ))
                : null}
        </View>
    );
};

const styles = StyleSheet.create({
    taskList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'center',
    },
});
export default TaskList;
