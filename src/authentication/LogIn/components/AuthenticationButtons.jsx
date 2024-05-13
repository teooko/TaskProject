import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import AuthenticationButton from "./AuthenticationButton";
import {icons} from "../../../assets/Icons";
import {useDispatch} from "react-redux";
import {goToPage} from "../../../store/layoutSlice";
import {menus} from "../../../constants";

const AuthenticationButtons = () => {
    const dispatch = useDispatch();
    return (
        <View style={styles.buttons}>
            <AuthenticationButton title={"Log in"} icon={icons.profile} handlePress={() => dispatch(goToPage(menus.logIn))} />
            <AuthenticationButton title={"Sign up"} icon={icons.userPlus} handlePress={() => dispatch(goToPage(menus.signUp))} />
        </View>
    );
};

const styles = StyleSheet.create({
    buttons: {
        display: "flex",
        gap: 20,
        alignItems: "center",
        justifyContent: "flex-end",
        height: "50%",
        
    }
})
export default AuthenticationButtons;