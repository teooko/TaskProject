import React, {useRef, useState} from 'react';
import {ScrollView, View, StyleSheet, TextInput, Text, Image, Pressable} from "react-native";
import Page from "../Page";
import {useDispatch, useSelector} from "react-redux";
import {setSendingMessage} from "../../store/webSocketSlice";
import * as yup from "yup";
import {getUserClaims, postLogIn} from "../../store/accountSlice";
import {Formik} from "formik";
import AuthenticationButton from "../../authentication/Authentication/components/AuthenticationButton";
import Svg, {SvgXml} from "react-native-svg";
import {icons} from "../../assets/Icons";


const ChatRoom = ({navigation}) => {
    const [lastUser, setLastUser] = useState(null);
    const {users, userIds, messages} = useSelector(state => state.webSocket);
    const {userName} = useSelector(state => state.account);
    const userNames = userIds.map(userId => users[userId].userName);
    const dispatch = useDispatch();
    const scrollViewRef = useRef(null);
    const getImageByUser = (user) => {
        for (let userId of userIds) {
            if (users[userId].userName === user) {
                return users[userId].profilePictureBase64;
            }
        }
        return null;
    }
    return (
        <Page navigation={navigation}>
            <ScrollView style={styles.chatRoomWrapper}
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                        overScrollMode={"never"}
                        showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>
                    {`Chat room created with ${userNames}`}
                </Text>
                {messages.map((message, index) => {
                    const profileImage = getImageByUser(message.user);
                    if(message.user === userName)
                        return <Text key={index} style={styles.sentMessage}>{message.message}</Text>
                    return (<View key={index}>
                            <View style={styles.userDetails}>
                                <Image style={styles.profileImages}
                                    source={{uri: `data:image/png;base64,${profileImage}`}}/>
                                <Text style={styles.userName}>{message.user}</Text>
                            </View>
                        <Text style={styles.receivedMessage}>{message.message}</Text>
                    </View>)
                })}
                <View style={{height: 25}}/>
            </ScrollView>
                <Formik
                    initialValues={{message: ""}}
                    onSubmit={(values, {resetForm}) => {
                        if (values.message.trim()) {
                            dispatch(setSendingMessage({ user: userName, message: values.message }));
                            resetForm();
                        }
                    }}
                    validationSchema={yup.object().shape({
                        message: yup.string().max(1000).required(),
                    })}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <View style={styles.messageInputWrapper}>
                            <TextInput placeholder={"Write a message..."}
                                       placeholderTextColor={"#E97C6F"}
                                       style={styles.messageInput}
                                       onChangeText={handleChange('message')}
                                       onBlur={handleBlur('message')}
                                       value={values.message}
                                       returnKeyType={"send"}
                                       onSubmitEditing={handleSubmit} />
                            <Pressable style={styles.sendButton} onPress={handleSubmit}>
                                <SvgXml style={styles.icon} xml={icons.paperAirplane} fill={"white"} width={20} height={20}/>
                            </Pressable>
                        </View>
                    )}
                </Formik>
        </Page>
    );
};

const styles = StyleSheet.create({
    chatRoomWrapper: {
        width: "96%",
        height: "100%",
        backgroundColor: "#B83838",
        alignSelf: "center",
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        paddingLeft: 20,
        paddingRight: 20
    },
    messageInputWrapper: {
        width: "90%",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#E97C6F",
        backgroundColor: "#DF5454",
        alignSelf: "center",
        marginBottom: 7,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    messageInput: {
        color: "white",
        overflow: "scroll",
        width: "80%"
    },
    title: {
        color: "#E97C6F",
        alignSelf: "center",
        marginBottom: 30,
        fontSize: 15
    },
    receivedMessage: {
        borderWidth: 1,
        borderColor: "white",
        color: "white",
        alignSelf: "flex-start",
        padding: 10,
        borderRadius: 20,
        borderTopLeftRadius: 0,
        marginTop: 5,
        marginLeft: 30,
        marginRight: 50
        
    },
    sentMessage: {
        borderWidth: 1,
        borderColor: "white",
        color: "white",
        alignSelf: "flex-end",
        padding: 10,
        borderRadius: 20,
        borderTopRightRadius: 0,
        marginTop: 13,
        marginLeft: 50
    },
    profileImages: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    userDetails: {
        marginTop: 13,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    userName: {
        color: "white",
        marginLeft: 5,
    },
    sendButton: {
        backgroundColor: "#B83838",
        width: 35,
        height: 35,
        margin: 5,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
})
export default ChatRoom;