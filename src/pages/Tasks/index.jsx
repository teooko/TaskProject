import Page from "../Page";
import axios from "axios";
import {useEffect, useState} from "react";
import {
    KeyboardAvoidingView,
    KeyboardAvoidingViewBase,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View
} from "react-native";
import {StyleSheet} from "react-native";
import ColorPicker, {HueSlider} from "reanimated-color-picker";
import useFetchData from "../../hooks/useFetchData";
import useTaskPost from "../../hooks/useTaskPost";
import {useSelector} from "react-redux";
const Tasks = ({navigation}) => {
    const [newTaskName, setNewTaskName] = useState("Create new task...");
    const [toggleColorPicker, setToggleColorPicker] = useState(false);
    const [newTaskColor, setNewTaskColor] = useState("#B56464");
    const onSelectColor = ({ hex }) => {
        // do something with the selected color.
        setNewTaskColor(hex);
    };
    let {data, setData,  isLoading} = useFetchData(`/Task`);
    const {addNewTask, isTaskLoading} = useTaskPost();
    const {tasks} = useSelector(state => state.tasksReducer);
    const handleAddNewTask = (newTaskName, newTaskColor) => {
        const newTask = addNewTask(newTaskName, newTaskColor);
        setData({...data, newTask});
    }
     const Thumb = ({positionStyle}) => {
        return (
            <View style={{backgroundColor: newTaskColor, borderColor: "white", borderRadius: 30, width: 24, height: 24, borderWidth: 1, position: positionStyle}}/>
        )
     }
    const deleteTask = async (id) => {
        try {
            const response = await axios.delete(`http://192.168.100.8:5133/Task?id=${id}`);
            console.log(response.data);
            fetchData();
        }
        catch (error)
        {
            console.error(error);
        }
    }
    
    return (
        <Page navigation={navigation}>
            
            
                <ScrollView style={styles.taskList} showsVerticalScrollIndicator={false} overScrollMode={"never"} automaticallyAdjustContentInsets={true}>
            {
                !isLoading ? tasks.map(task => 
                    <View key={task.id ? task.id : task.$id} style={styles.task}>
                        <Text style={styles.taskName}>{task.name}</Text>
                        <View style={styles.taskButtons}>
                            <Pressable style={{...styles.taskColor, backgroundColor: task.color}}>
                            </Pressable>
                            <Pressable style={styles.deleteTask} onPress={() => deleteTask(task.id ? task.id : task.$id)}>
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
                               style={styles.taskName}>{newTaskName}</TextInput>
                    <View style={styles.taskButtons}>
                        <Pressable style={{...styles.taskColor, backgroundColor: newTaskColor, width: 100}} onPress={() => setToggleColorPicker(!toggleColorPicker)}>
                            <Text style={{alignSelf: "center", paddingTop: 3}}>
                                Choose Color
                            </Text>
                        </Pressable>
                        <Pressable style={styles.deleteTask} onPress={() => handleAddNewTask(newTaskName, newTaskColor)}>
                            <Text>
                                Add Task
                            </Text>
                        </Pressable>
                    </View>
                </View>
                { toggleColorPicker &&
                    <ColorPicker 
                                 //renderThumb={(props) => <Thumb positionStyle={props.positionStyle />}
                                  sliderThickness={25} style={{ width: '100%', height: 100, marginTop: 10 }} value={"red"} onChange={onSelectColor}>
                        <HueSlider />
                    </ColorPicker>
                }
            </View>
                </ScrollView>
           
            
        </Page>
    )
}

const styles = StyleSheet.create({
    taskList: {
        display: "flex",
        flexDirection: "column",
        marginLeft: 20,
        marginRight: 20,
    },
    task: {
        padding: 10,
        marginTop: 10,
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