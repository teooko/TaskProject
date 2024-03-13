import {StyleSheet, View} from 'react-native';
import React from 'react';
import TaskListItem from './TaskListItem';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDailyTasks} from '../../store/tasksSlice';

const TaskList = () => {
    const status = useSelector(state => state.tasksReducer.status);
    const {dailyTasks} = useSelector(state => state.tasksReducer);
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
