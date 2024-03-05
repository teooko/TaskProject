import Page from "../Page";
import { ScrollView } from "react-native";
import TaskList from "./TaskList";
import TaskListForm from "./TaskListForm";
import {StyleSheet} from "react-native";
const Tasks = ({navigation}) => {
    return (
        <Page navigation={navigation}>
                <ScrollView style={styles.tasksWrapper} showsVerticalScrollIndicator={false} overScrollMode={"never"} automaticallyAdjustContentInsets={true}>
                    <TaskList />
                    <TaskListForm />
                </ScrollView>
        </Page>
    )
}

const styles = StyleSheet.create({
    tasksWrapper: {
        marginLeft: 20,
        marginRight: 20,
    }
})

export default Tasks;