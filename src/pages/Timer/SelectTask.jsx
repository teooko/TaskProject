import React from 'react';
import {SelectList} from "react-native-dropdown-select-list/index";
import {setCurrentTaskId} from "../../store/timerSlice";
import {Dimensions, StyleSheet, View} from "react-native";
import {useGetTasksQuery} from "../../store/api";
import {useDispatch} from "react-redux";

const {height, width} = Dimensions.get('window');
const SelectTask = () => {
    const {data: tasks, isLoading, error} = useGetTasksQuery();
    const dispatch = useDispatch();
    return (
        <View style={{position: "absolute", top: 40, left: width / 2 - 150, width: 300, zIndex: 1}}>
            <SelectList dropdownItemStyles={{backgroundColor: "#B83838", color: "white"}}
                        boxStyles={{backgroundColor: "#B83838", borderWidth: 0, color: "white"}}
                        inputStyles={{color: "#EAC4C4"}}
                        dropdownTextStyles={{color: "#EAC4C4"}}
                        dropdownStyles={{backgroundColor: "#B83838", borderColor: "#560D0D", color: "#A600E8"}}
                        data={tasks.map(task => ({key: task.id, value: task.name}))}
                        setSelected={(val) => dispatch(setCurrentTaskId(val))}/>
        </View>
    );
};

const styles = StyleSheet.create({
    timer: {
        zIndex: 2,
        fontSize: 60,
        marginLeft: "auto",
        marginRight: "auto",
        top: -150
    },
    icon: {
        fill: 'white',
    },
    button: {
        marginBottom: 30,
        width: 20,
        height: 20,
    },
    controls: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
    },
    buttonText: {
        color: "white",
    },
    addFriendsButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        marginBottom: 10,
        height: 30
    },
    profileImages: {
        width: 30,
        height: 30,
        borderRadius: 15
    }
});

export default SelectTask;