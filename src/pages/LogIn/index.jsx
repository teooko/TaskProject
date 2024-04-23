import React, {useEffect} from 'react';
import {Button, View} from "react-native";
import NavigationBar from "../Page/NavigationBar";
import {useDispatch, useSelector} from "react-redux";
import {postLogInDefault, postLogInOtherAcc} from "../../store/accountSlice";
import {useNavigation} from "@react-navigation/native";
import Home from "../Home";
import {fetchDailyTasks, fetchTasks} from "../../store/tasksSlice";
import {fetchWeeklyTasks, insertDays, selectDay} from "../../store/slice";

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
            <Button title={"Log in"} onPress={() => dispatch(postLogInDefault())}></Button>
            <Button title={"Log in other account"} onPress={() => dispatch(postLogInOtherAcc())}></Button>
        </View>
    );
};

export default LogIn;