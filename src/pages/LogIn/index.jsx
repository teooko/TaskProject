import React, {useEffect} from 'react';
import {StyleSheet, Button, View, Pressable, Text, TextInput, KeyboardAvoidingView, Dimensions} from "react-native";
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
import AuthenticationButton from "./AuthenticationButton";
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
            <LinearGradient colors={['#E97C6F', '#FFC165']} style={styles.gradient}>
                <KeyboardAvoidingView behavior={"position"}>
                <View>
                    <Text style={{...styles.text, marginLeft: 10, marginTop: 10}}>
                        Skip
                    </Text>
                </View>
                    <View style={{width: "100%", height: "40%", marginTop: 70}}>
                        <SvgXml
                            xml={icons.logo}
                            width={"90%"}
                            height={Dimensions.get('window').width / 2}
                            style={styles.logo}
                        />
                    </View>
                <View style={styles.signUpForm}>
                    <Text style={styles.title}>
                        Sign up
                    </Text>
                    <TextInput placeholder={"email"} style={styles.textInput} placeholderTextColor={"#E97C6F"} />
                    <TextInput placeholder={"password"} style={styles.textInput} placeholderTextColor={"#E97C6F"}/>
                    <AuthenticationButton title={"submit"} />
                </View>
                {
                    //<AuthenticationButtons />
                }
                </KeyboardAvoidingView>
            </LinearGradient>
    );
};

const styles = StyleSheet.create({
    logo: {
        marginLeft: "auto",
        marginRight: "auto",
    },
    text: {
        color: "white",
        fontSize: 18,
    },
    gradient: {
        height: "100%"
    },
    signUpForm: {
        display: "flex",
        gap: 20,
        marginLeft: "auto",
        marginRight: "auto"
    },
    textInput: {
        backgroundColor: "white",
        borderColor: "#E97C6F",
        borderWidth: 1,
        borderRadius: 10,
        color: "gray",
        width: 200,
        height: 50,
    },
    title: {
        fontSize: 18,
        color: "white"
    }
})
export default LogIn;