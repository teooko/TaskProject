import React, {useEffect} from 'react';
import {Dimensions, KeyboardAvoidingView, StyleSheet, Text, View} from "react-native";
import {SvgXml} from "react-native-svg";
import {icons} from "../../assets/Icons";
import AuthenticationButtons from "../LogIn/AuthenticationButtons";
import SignUpForm from "../LogIn/SignUpForm";
import LogInForm from "../LogIn/LogInForm";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
    Easing,
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from "react-native-reanimated";
import {fetchWeeklyTasks, insertDays, resetCalendarState, selectDay} from "../../store/slice";
import {fetchDailyTasks, fetchTasks, resetTaskState} from "../../store/tasksSlice";
import {useDispatch, useSelector} from "react-redux";
import Home from "../Home";
import {getUserClaims, resetBearerToken} from "../../store/accountSlice";
import {useIsFocused} from "@react-navigation/native";
import ExtraUserDataForm from "../LogIn/ExtraUserDataForm";

const Loading = ({navigation}) => {

    const rotation = useSharedValue(0);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    
    const {bearerToken, userName, profilePicturePath} = useSelector(state => state.account);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }],
            width: 30, height: 30
        };
    });
    
    
    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, {
                duration: 1000,
                easing: Easing.inOut(Easing.linear),
            }),
            0,
        );
    }, []);
    
    useEffect(() => {
        if(isFocused) {
            if(userName === null) {
                navigation.navigate(ExtraUserDataForm);
            }
            else {
                //dispatch(resetTaskState());
                dispatch(resetCalendarState());
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const day = String(currentDate.getDate()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;
                dispatch(fetchTasks(bearerToken));
                dispatch(selectDay(0));
                dispatch(fetchDailyTasks({bearerToken, date: formattedDate}));
                dispatch(insertDays());
                dispatch(fetchWeeklyTasks({bearerToken, fromDate: 0}));
                navigation.navigate(Home);
            }
        }
    }, [isFocused]);
    
    return (
        <LinearGradient colors={['#E97C6F', '#FFC165']} style={styles.gradient}>
                <View style={styles.logoWrapper}>
                    <SvgXml
                        xml={icons.logo}
                        width={"90%"}
                        height={Dimensions.get('window').width / 3}
                        style={styles.logo}
                    />
                </View>
            <Animated.View style={{...animatedStyle}}>
                <SvgXml
                    xml={icons.circleNotch}
                    width={30}
                    height={30}
                    fill={"white"}
                />
            </Animated.View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    logoWrapper: {
        height: Dimensions.get('window').width / 2,
        marginTop: 70
    },
    gradient: {
        height: "100%",
        display: "flex",
        alignItems: "center"
    }
})
export default Loading;