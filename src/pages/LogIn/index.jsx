import React, {useEffect, useState} from 'react';
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
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import Loading from "../Loading";
const LogIn = () => {
    const menus = {
        authenticate: "authenticate",
        logIn: "logIn",
        signUp: "signUp"
    }
    const dispatch = useDispatch();
    const {bearerToken} = useSelector(state => state.account);
    const navigation = useNavigation();
    const [menu, setMenu] = useState(menus.authenticate);
    
    useEffect(() => {
        if(bearerToken !== null) {
            navigation.navigate(Loading);
        }
    }, [bearerToken]);
    
    return (
            <LinearGradient colors={['#E97C6F', '#FFC165']} style={styles.gradient}>
                <KeyboardAvoidingView behavior={"position"} >
                <View>
                    <Text style={{...styles.text, marginLeft: 10, marginTop: 10}}>
                        Skip
                    </Text>
                </View>
                    <View style={styles.logoWrapper}>
                        <SvgXml
                            xml={icons.logo}
                            width={"90%"}
                            height={Dimensions.get('window').width / 3}
                            style={styles.logo}
                        />
                    </View>
                    {menu === menus.authenticate && <AuthenticationButtons menus={menus} setMenu={setMenu}/>}
                    {menu === menus.signUp && <SignUpForm menus={menus} setMenu={setMenu}/>}
                    {menu === menus.logIn && <LogInForm menus={menus} setMenu={setMenu}/>}
                </KeyboardAvoidingView>
            </LinearGradient>
    );
};

const styles = StyleSheet.create({
    logo: {
        marginLeft: "auto",
        marginRight: "auto"
    },
    logoWrapper: {
        width: "100%", 
        height: Dimensions.get('window').width / 2, 
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