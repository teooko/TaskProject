import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import TaskListItem from './TaskListItem';
import {useGetTasksQuery} from "../../store/api";

const TaskList = () => {
    //const {tasks} = useSelector(state => state.tasks);
    const { data: tasks, error, isLoading } = useGetTasksQuery();
    const status = useSelector(state => state.tasks.status);
    return (
        <View style={styles.taskList}>
            {status !== 'loading' && status !== 'failed'
                ? tasks
                      .map(task => (
                          <TaskListItem
                              // TODO: Solve this .id and dollar sign .id
                              key={task.id ? task.id : task.$id}
                              name={task.name}
                              id={task.id ? task.id : task.$id}
                              color={task.color}
                          />
                      ))
                      .reverse()
                : null}
        </View>
    );
};

const styles = StyleSheet.create({
    taskList: {
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        overflow: 'hidden',
        paddingBottom: 14,
    },
});

export default TaskList;
