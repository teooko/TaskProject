import React from 'react';
import {postLogInDefault} from "../../store/accountSlice";
import {SvgXml} from "react-native-svg";
import {icons} from "../../assets/Icons";
import {Pressable, StyleSheet, Text} from "react-native";

const AuthenticationButton = ({title, handlePress, icon, isSubmitting}) => {
    return (
        <Pressable style={styles.button} onPress={handlePress} disabled={isSubmitting}>
            {icon && <SvgXml
                xml={icon}
                width={20}
                height={20}
                fill={"white"}
            />}
            <Text style={styles.text}>
                {title}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 200,
        height: 50,
        borderRadius: 20,
        borderWidth: 1,
        flexDirection: "row",
        borderColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
    text: {
        color: "white",
        fontSize: 18,
    }
})
export default AuthenticationButton;