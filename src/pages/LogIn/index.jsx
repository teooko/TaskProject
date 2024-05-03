import React, {useEffect} from 'react';
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
            <SvgXml
                xml={icons.logo}
                width={350}
                height={350}
                style={styles.logo}
            />
            <View style={styles.buttons}>
                <Pressable style={styles.button} onPress={() => dispatch(postLogInDefault())}>
                    <Text style={styles.text}>
                        Log in
                    </Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => dispatch(postLogInOtherAcc())}>
                    <Text style={styles.text}>
                        Register
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 70
    },
    buttons: {
        display: "flex",
        gap: 20,
        alignItems: "center"
    },
    button: {
        width: 200,
        height: 50,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#B53535",
        borderStyle: "dashed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#B53535",
        fontSize: 18,
    }
})
export default LogIn;