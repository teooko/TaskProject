import {Button, Pressable, ScrollView, StyleSheet, Text} from "react-native";
import Page from "../Page";
import React, {useEffect, useState} from "react";
import Calendar from "./Calendar";
import DailyActivity from "./DailyActivity";
import axios from "axios";
import useFetchData from "../../hooks/useFetchData";
import {useSelector} from "react-redux";

const Home = ({ navigation }) => {
    const { isLoading} = useFetchData(`/Task`);
    const {tasks} = useSelector(state => state.tasksReducer);
    
    return (
            <Page navigation={navigation}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} overScrollMode={"never"} showsVerticalScrollIndicator={false}>
                    <Calendar />
                    <DailyActivity tasks={tasks} isLoading={isLoading}/>
                    
                </ScrollView>
                
            </Page>
    );
}

export default Home