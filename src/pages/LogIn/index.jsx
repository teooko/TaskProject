import React, {useEffect} from 'react';
import {Button, View} from "react-native";
import NavigationBar from "../Page/NavigationBar";
import {useDispatch, useSelector} from "react-redux";
import {postLogInDefault} from "../../store/accountSlice";

const LogIn = ({navigation}) => {
    const dispatch = useDispatch();
    const {bearerToken} = useSelector(state => state.account);
    
    useEffect(() => {
        
    }, [bearerToken]);
    
    return (
        <View>
            <NavigationBar navigation={navigation} />
            <Button title={"Log in"} onPress={() => dispatch(postLogInDefault())}></Button>
        </View>
    );
};

export default LogIn;