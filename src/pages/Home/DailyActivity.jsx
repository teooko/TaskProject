import {Pressable, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import TaskList from './TaskList';
import {useSelector} from 'react-redux';
import {useGetDailyTasksQuery} from "../../store/api";
import Piechart from "./Piechart";
const DailyActivity = () => {
    // TODO: Maybe get rid of useSelector?
    const {selectedDate} = useSelector(state => state.tasks);
    const {data: dailyTasks, error, isLoading} = useGetDailyTasksQuery(selectedDate);
    
    const totalTime = !isLoading && dailyTasks !== undefined
        ? dailyTasks.reduce((acc, task) => (acc = acc + task.seconds), 0)
        : null;
    
    const date = new Date(selectedDate);
    
    return (
        <LinearGradient
            colors={['#E97C6F', '#FFC165']}
            style={styles.dailyActivity}>
            <Text style={styles.dailyActivityLabel}>
                {` ${date.toDateString()} activity`}
            </Text>
            <Text style={styles.timeLabel}>
                {totalTime
                    ? `${(totalTime / 60).toFixed()} minutes`
                    : 'No activity'}
            </Text>
            <Piechart />
            <TaskList />
            <Pressable style={styles.addTaskButton}>
                <Text style={styles.taskButtonText}>Add Task</Text>
            </Pressable>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    dailyActivity: {
        flexGrow: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingLeft: 20,
        paddingRight: 10,
        paddingBottom: 60,
    },
    dailyActivityLabel: {
        fontSize: 22,
        color: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
    },
    timeLabel: {
        fontSize: 18,
        color: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 5,
    },
    addTaskButton: {
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: '#DF5454',
        position: 'absolute',
        bottom: 10,
        marginTop: 20,
        alignSelf: 'center',
    },
    taskButtonText: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 15,
        color: 'white',
    },
});

export default DailyActivity;
