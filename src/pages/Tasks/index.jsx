import Page from "../Page";
import axios from "axios";
import {useEffect, useState} from "react";
import {Pressable, Text, TextInput, View} from "react-native";
import {StyleSheet} from "react-native";
const Tasks = ({navigation}) => {
    
    const [tasks, setTasks] = useState(null);
    const [newTaskName, setNewTaskName] = useState(null);
    const fetchData = async () => {
        try {
            const response = await axios.get("http://192.168.100.8:5133/Task");
            setTasks(response.data.$values);
            console.log(response.data.$values);

        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
        console.log("merge?");
    }, []);
    
    return (
        <Page navigation={navigation}>
            <View style={styles.taskList}>
            {
                tasks ? tasks.map(task => 
                    <View style={styles.task}>
                        <Text style={styles.taskName}>{task.name}</Text>
                        <View style={styles.taskButtons}>
                            <Pressable style={{...styles.taskColor, backgroundColor: task.color}}>
                            </Pressable>
                            <Pressable style={styles.deleteTask}>
                                <Text>
                                X
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                ) : null
            }
            <View>
                <View style={styles.task}>
                    <TextInput onChangeText={(value) => setNewTaskName(value)} 
                               style={styles.taskName}>{newTaskName ? newTaskName : "Create New Task..."}</TextInput>
                    <View style={styles.taskButtons}>
                        <Pressable style={{...styles.taskColor}}>
                            <Text>
                                Choose Color
                            </Text>
                        </Pressable>
                        <Pressable style={styles.deleteTask}>
                            <Text>
                                Add Task
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    taskList: {
        display: "flex",
        gap: 10,
        flexDirection: "column",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
    },
    task: {
        padding: 10,
        borderColor: "#E97C6F",
        borderRadius: 5,
        borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    taskName: {
        fontSize: 15,
        color: "white"
    },
    taskColor: {
        width: 60,
        height: 30,
        borderColor: "#E97C6F",
        borderRadius: 15,
        borderWidth: 1,
    },
    taskButtons: {
        flexDirection: "row",
        alignItems: "center"
    },
    deleteTask: {
        marginLeft: 10,
        marginRight: 5
    }
})
export default Tasks;