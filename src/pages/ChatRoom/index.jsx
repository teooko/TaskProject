import React from 'react';
import {ScrollView, View, StyleSheet, TextInput, Text} from "react-native";
import Page from "../Page";
import {useDispatch, useSelector} from "react-redux";
import {setSendingMessage} from "../../store/webSocketSlice";
import * as yup from "yup";
import {getUserClaims, postLogIn} from "../../store/accountSlice";
import {Formik} from "formik";
import AuthenticationButton from "../../authentication/Authentication/components/AuthenticationButton";

const ChatRoom = () => {
    const {users, userIds} = useSelector(state => state.webSocket);
    const {bearerToken} = useSelector(state => state.account);
    const userNames = userIds.map(userId => users[userId].userName);
    const dispatch = useDispatch();
    return (
        <Page>
            <ScrollView style={styles.chatRoomWrapper}>
                <Text style={styles.title}>
                    {`Chat room created with ${userNames}`} 
                </Text>
            </ScrollView>
            <View style={styles.messageInputWrapper}>
                <Formik
                    initialValues={{message: ""}}
                    onSubmit={(values, {resetForm}) => {
                        dispatch(setSendingMessage(values.message));
                        resetForm();
                    }}
                    validationSchema={yup.object().shape({
                        message: yup.string().max(255),
                    })}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <TextInput placeholder={"Write a message..."}
                                   placeholderTextColor={"#E97C6F"}
                                   style={styles.messageInput}
                                   onChangeText={handleChange('message')}
                                   onBlur={handleBlur('message')}
                                   value={values.message}
                                   onEndEditing={() => handleSubmit()} />
                    )}
                </Formik>
                
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
    },
    title: {
        color: "#E97C6F",
        alignSelf: "center",
        fontSize: 15
    }
})
export default ChatRoom;