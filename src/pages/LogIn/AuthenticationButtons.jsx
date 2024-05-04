import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import {postLogInDefault, postLogInOtherAcc} from "../../store/accountSlice";
import {SvgXml} from "react-native-svg";
import {icons} from "../../assets/Icons";
import AuthenticationButton from "./AuthenticationButton";
import {useDispatch} from "react-redux";

const AuthenticationButtons = ({menus, setMenu}) => {
    const dispatch = useDispatch();
    return (
        <View style={styles.buttons}>
            <AuthenticationButton title={"Log in"} icon={icons.profile} handlePress={() => dispatch(postLogInDefault())} />
            <AuthenticationButton title={"Sign up"} icon={icons.profile} handlePress={() => setMenu(menus.signUp)} />
        </View>
    );
};

const styles = StyleSheet.create({
    buttons: {
        display: "flex",
        gap: 20,
        alignItems: "center"
    }
})
export default AuthenticationButtons;