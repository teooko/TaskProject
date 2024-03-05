import {Button, Pressable, ScrollView, StyleSheet, Text} from "react-native";
import Page from "../Page";
import React, {useEffect, useState} from "react";
import Calendar from "./Calendar";
import DailyActivity from "./DailyActivity";
import axios from "axios";
import useFetchData from "../../hooks/useFetchData";
import {useDispatch, useSelector} from "react-redux";
import { fetchTasks } from "../../store/tasksSlice";

const Home = ({ navigation }) => {
    return (
            <Page navigation={navigation}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} overScrollMode={"never"} showsVerticalScrollIndicator={false}>
                    <Calendar />
                    <DailyActivity />
                </ScrollView>
            </Page>
    );
}

export default Home