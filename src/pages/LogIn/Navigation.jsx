import React from 'react';
import {Dimensions, Pressable, StyleSheet, View, Text} from "react-native";

const Navigation = ({menus, menu, setMenu}) => {
    return (
        <View style={styles.navigation}>
            <Text style={styles.text}>
                Skip
            </Text>
            {   (menu === menus.logIn ||
                    menu === menus.signUp) &&
                <Pressable onPress={() => setMenu(menus.authenticate)}>
                    <Text style={styles.text}>
                        Back
                    </Text>
                </Pressable>}

        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 18,
    },
    navigation: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignContent: "space-between",
        justifyContent: "space-between",
        padding: 10
    }
})
export default Navigation;