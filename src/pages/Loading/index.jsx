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
import {fetchWeeklyTasks, insertDays, selectDay} from "../../store/slice";
import {fetchDailyTasks, fetchTasks} from "../../store/tasksSlice";
import {useDispatch, useSelector} from "react-redux";
import Home from "../Home";

const Loading = ({navigation}) => {

    const rotation = useSharedValue(0);
    const dispatch = useDispatch();
    const {bearerToken} = useSelector(state => state.account);
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
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
            const day = String(currentDate.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;

            dispatch(selectDay(0));
            dispatch(fetchDailyTasks({bearerToken, date: formattedDate}));
            dispatch(insertDays());
            dispatch(fetchWeeklyTasks({bearerToken, fromDate: 0}));
            console.log(bearerToken);
            navigation.navigate(Home);
    }, []);
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