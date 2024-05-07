import React from 'react';
import {Dimensions, KeyboardAvoidingView, Pressable, StyleSheet, Text, View} from "react-native";
import {SvgXml} from "react-native-svg";
import {icons} from "../../assets/Icons";
import AuthenticationButtons from "./AuthenticationButtons";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import LinearGradient from "react-native-linear-gradient";

const ExtraUserDataForm = () => {
    return (
            <LinearGradient colors={['#E97C6F', '#FFC165']} style={styles.gradient}>
                <KeyboardAvoidingView behavior={"position"} >
                    <View style={styles.navigation}>
                        <Pressable onPress={() => setMenu(menus.authenticate)}>
                            <Text style={styles.text}>
                                Back
                            </Text>
                        </Pressable>
                    </View>
                    <View style={styles.logoWrapper}>
                        <SvgXml
                            xml={icons.logo}
                            width={"90%"}
                            height={Dimensions.get('window').width / 3}
                            style={styles.logo}
                        />
                    </View>
                    <View style={styles.selectProfilePicture} >
                        <Text style={styles.imageText}>
                            Add profile picture
                        </Text>
                        <SvgXml xml={icons.picture} 
                                style={styles.logo}
                        fill={"white"}
                        width={30}
                        height={30}/>
                    </View>
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
    imageText: {
        color: "white",
        fontSize: 18,
        marginLeft: "auto",
        marginRight: "auto"
    },
    gradient: {
        height: "100%",
    },
    navigation: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignContent: "space-between",
        justifyContent: "space-between",
        padding: 10
    },
    selectProfilePicture: {
        backgroundColor: "#E97C6F",
        width: 200,
        height: 200,
        borderRadius: 100,
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    }
})

export default ExtraUserDataForm;