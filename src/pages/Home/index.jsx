import {Button, Pressable, ScrollView, StyleSheet, Text} from "react-native";
import Page from "../Page";
import React, {useEffect, useState} from "react";
import Calendar from "./Calendar";
import DailyActivity from "./DailyActivity";
import axios from "axios";

const Home = ({ navigation }) => {
    const [tasks, setTasks] = useState(null);

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
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} overScrollMode={"never"} showsVerticalScrollIndicator={false}>
                    <Calendar />
                    <DailyActivity tasks={tasks}/>
                </ScrollView>
                
            </Page>
    );
}

export default Home