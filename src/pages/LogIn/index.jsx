﻿import React, {useEffect} from 'react';
import {StyleSheet, Button, View, Pressable, Text} from "react-native";
import NavigationBar from "../Page/NavigationBar";
import {useDispatch, useSelector} from "react-redux";
import {postLogInDefault, postLogInOtherAcc} from "../../store/accountSlice";
import {useNavigation} from "@react-navigation/native";
import Home from "../Home";
import {fetchDailyTasks, fetchTasks} from "../../store/tasksSlice";
import {fetchWeeklyTasks, insertDays, selectDay} from "../../store/slice";
import Svg, {SvgUri, SvgXml} from "react-native-svg";
import {icons} from "../../assets/Icons";
import LinearGradient from "react-native-linear-gradient";
import AuthenticationButtons from "./AuthenticationButtons";
const LogIn = () => {
    const dispatch = useDispatch();
    const {bearerToken} = useSelector(state => state.account);
    const navigation = useNavigation();
    
    useEffect(() => {
        if(bearerToken !== null) {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
            const day = String(currentDate.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;

            dispatch(selectDay(0));
            dispatch(fetchDailyTasks({bearerToken, date: formattedDate}));
            dispatch(insertDays());
            dispatch(fetchTasks(bearerToken));
            dispatch(fetchWeeklyTasks({bearerToken, fromDate: 0}));
            navigation.navigate(Home);
        }
    }, [bearerToken]);
    
    return (
        <View>
            <LinearGradient colors={['#E97C6F', '#FFC165']} style={styles.gradient}>
                <View>
                    <Text style={{...styles.text, marginLeft: 10, marginTop: 10}}>
                        Skip
                    </Text>
                </View>
                <SvgXml
                    xml={icons.logo}
                    width={350}
                    height={350}
                    style={styles.logo}
                />
                <AuthenticationButtons />
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 70
    },
    text: {
        color: "white",
        fontSize: 18,
    },
    gradient: {
        height: "100%"
    }
})
export default LogIn;