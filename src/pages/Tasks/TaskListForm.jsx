import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import ColorPicker, {HueSlider} from "reanimated-color-picker";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addNewTask} from "../../store/tasksSlice";
import {icons} from "../../assets/Icons";
import {SvgXml} from "react-native-svg";
import * as React from "react";

const TaskListForm = () => {

    const [newTaskName, setNewTaskName] = useState("Create new task...");
    const [toggleColorPicker, setToggleColorPicker] = useState(false);
    const [newTaskColor, setNewTaskColor] = useState("#B56464");
    const onSelectColor = ({ hex }) => {
        // do something with the selected color.
        setNewTaskColor(hex);
    };
    
    const dispatch = useDispatch();
    const handleAddNewTask = async (newTaskName, newTaskColor) => {
        await dispatch(addNewTask({name: newTaskName, color: newTaskColor}));
    }
    const Thumb = ({positionStyle}) => {
        return (
            <View style={{backgroundColor: newTaskColor, borderColor: "white", borderRadius: 30, width: 24, height: 24, borderWidth: 1, position: positionStyle}}/>
        )
    }
    return (
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
                    <Pressable style={styles.addTask} onPress={() => handleAddNewTask(newTaskName, newTaskColor)}>
                        <SvgXml xml={icons.plus} width={'20'} height={'20'} style={styles.icon}/>
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
    )
}

const styles = StyleSheet.create({
    task: {
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white"
    },
    taskName: {
        fontSize: 15,
        color: "#560D0D"
    },
    taskColor: {
        width: 60,
        height: 30,
        borderRadius: 15,
    },
    taskButtons: {
        flexDirection: "row",
        alignItems: "center"
    },
    addTask: {
        padding: 8,
        marginLeft: 10,
    },
    icon: {
        fill: "#560D0D",
    }
})
export default TaskListForm;