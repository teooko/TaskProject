import React from 'react';
import {Dimensions, Pressable, StyleSheet, View, Text} from "react-native";

const Navigation = ({skipButtonVisible, backButtonVisible, handleNavigation}) => {
    return (
        <View style={styles.navigation}>
            {skipButtonVisible ? <Text style={styles.text}>
                Skip
            </Text> : <View />}
            { backButtonVisible &&
                <Pressable onPress={() => handleNavigation()}>
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