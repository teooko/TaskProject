import React from 'react';
import {ScrollView, View, StyleSheet, TextInput} from "react-native";
import Page from "../Page";

const ChatRoom = () => {
    return (
        <Page>
            <ScrollView style={styles.chatRoomWrapper}>
            </ScrollView>
            <View style={styles.messageInputWrapper}>
                <TextInput placeholder={"Write a message..."} placeholderTextColor={"#E97C6F"} style={styles.messageInput}></TextInput>
            </View>
        </Page>
    );
};

const styles = StyleSheet.create({
    chatRoomWrapper: {
        width: "96%",
        height: "100%",
        backgroundColor: "#B83838",
        alignSelf: "center",
        borderRadius: 20
    },
    messageInputWrapper: {
        width: "90%",
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#E97C6F",
        backgroundColor: "#DF5454",
        alignSelf: "center",
        marginBottom: 7
    },
    messageInput: {
        color: "white"
    }
})
export default ChatRoom;