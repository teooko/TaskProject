import {StyleSheet, View} from 'react-native';
import React from 'react';
import TaskListItem from './TaskListItem';
import {useSelector} from 'react-redux';
import {useGetDailyTasksQuery} from "../../store/api";

const TaskList = () => {
    // TODO: Add loading mechanism
    const {selectedDate} = useSelector(state => state.tasks);
    const {data: dailyTasks, error, isLoading} = useGetDailyTasksQuery(selectedDate);
    return (
        <View style={styles.taskList}>
            {dailyTasks
                ? dailyTasks.map(task => (
                      <TaskListItem
                          key={task.name}
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
