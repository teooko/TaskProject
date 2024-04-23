import React, {useEffect} from 'react';
import {Button, View} from "react-native";
import NavigationBar from "../Page/NavigationBar";
import {useDispatch, useSelector} from "react-redux";
import {postLogInDefault} from "../../store/accountSlice";
import {useNavigation} from "@react-navigation/native";
import Home from "../Home";

const LogIn = () => {
    const dispatch = useDispatch();
    const {bearerToken} = useSelector(state => state.account);
    const navigation = useNavigation();
    useEffect(() => {
        if(bearerToken !== null)
            navigation.navigate(Home);
    }, [bearerToken]);
    
    return (
        <View>
            <Button title={"Log in"} onPress={() => dispatch(postLogInDefault())}></Button>
        </View>
    );
};

export default LogIn;