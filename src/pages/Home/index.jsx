import {Button, Pressable, ScrollView, StyleSheet, Text} from "react-native";
import Page from "../Page";
import React, {useEffect, useState} from "react";
import Calendar from "./Calendar";
import DailyActivity from "./DailyActivity";
import axios from "axios";
import useFetchData from "../../hooks/useFetchData";

const Home = ({ navigation }) => {
    const [tasks, setTasks] = useState(null);

    const {data, isLoading} = useFetchData(`/Task`);
    return (
            <Page navigation={navigation}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} overScrollMode={"never"} showsVerticalScrollIndicator={false}>
                    <Calendar />
                    <DailyActivity tasks={data} isLoading={isLoading}/>
                </ScrollView>
                
            </Page>
    );
}

export default Home