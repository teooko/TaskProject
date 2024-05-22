import {useEffect, useState} from "react";
import React from 'react';
import {Alert, Modal, Pressable, View, StyleSheet, Text, TextInput} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {triggerInvitationModal} from "../store/webSocketSlice";
import {Formik} from "formik";
import {getUserClaims, postLogIn} from "../store/accountSlice";
import * as yup from "yup";
import AuthenticationButton from "../authentication/Authentication/components/AuthenticationButton";

const WebSocketService = ({children}) => {
    const [ws, setWs] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [invitation, setInvitation] = useState({
        sender: null,
        roomId: null
    });
    
    const {userName, bearerToken} = useSelector(state => state.account);
    const {showInvitationModal} = useSelector(state => state.webSocket);
    const dispatch = useDispatch();
    const connect = () => {
        setWs(new WebSocket('ws://192.168.100.8:8080'));
    }
    useEffect(() => {
        if(bearerToken !== null)
        {
            connect();
        }
    }, [bearerToken]);

    useEffect(() => {
        if(ws !== null) {
            ws.onopen = () => {
                //ws.send('something');
            };
            ws.onclose = (e) => {
            };
            ws.onerror = (e) => {
                console.log(e.message);
            };
            ws.onmessage = async (e) => {
                receiveInvitation(e);
            };
        }
    }, [ws]);

    const sendInvitation = (ws, recipient, roomId) => {
        if(ws !== null) {
            ws.send(JSON.stringify({
                        "sender": userName,
                        "recipient": recipient,
                        "roomId": roomId,
                    }
                )
            )
        }
    };

    const receiveInvitation = (e) => {
            const data = JSON.parse(e.data);
            
            if(userName === data.recipient)
            {
                setInvitation({
                    sender: data.sender,
                    roomId: data.roomId
                });
                setModalVisible(true);
            }
    }
    return (
        <View style={styles.wrapper}>
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>Invitation</Text>
                        <Text style={styles.modalText}>
                            {`You received an invitation from `}
                            <Text style={styles.senderName}>{invitation.sender}</Text>
                            {` to join their pomodoro session. Do you accept?`}
                        </Text>
                        <View style={styles.buttonsWrapper}>
                            <Pressable
                                style={styles.button}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Accept</Text>
                            </Pressable>
                            <Pressable
                                style={styles.button}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Decline</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                transparent={true}
                visible={showInvitationModal}
                onRequestClose={() => {
                    dispatch(triggerInvitationModal());
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>Send an Invitation</Text>
                        <Formik
                            initialValues={{ recipient: '' }}
                            onSubmit={(values) => {
                                dispatch(triggerInvitationModal());
                                sendInvitation(ws, values.recipient, 100);
                            }}
                            validationSchema={yup.object().shape({
                                recipient: yup.string().required('Recipient is required'),
                            })}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                                <View style={styles.signUpForm}>
                                        <View style={styles.textInputWrapper}>
                                            <Text style={styles.modalText}>
                                                To:
                                            </Text>
                                            <TextInput
                                                placeholder="Recipient"
                                                style={styles.textInput}
                                                placeholderTextColor="white"
                                                onChangeText={handleChange('recipient')}
                                                onBlur={handleBlur('recipient')}
                                                value={values.recipient}
                                                autoCapitalize="none"
                                            />
                                            {errors.recipient && <Text style={styles.errorText}>{errors.recipient}</Text>}
                                        </View>
                                    <View style={styles.buttonsWrapper}>
                                        <Pressable
                                            style={styles.button}
                                            onPress={() => handleSubmit()}>
                                            <Text style={styles.textStyle}>Send</Text>
                                        </Pressable>
                                        <Pressable
                                            style={styles.button}
                                            onPress={() => dispatch(triggerInvitationModal())}>
                                            <Text style={styles.textStyle}>Cancel</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                </View>
            </Modal>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(128, 64, 64, 0.5)"
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 300
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        backgroundColor: "#DF5454"
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: "black",
        paddingTop: 10
    },
    wrapper: {
        width: "100%",
        height: "100%"
    },
    buttonsWrapper: {
        display: "flex",
        flexDirection: "row",
        gap: 40,
        justifyContent: "center"
    },
    title: {
        color: "#DF5454",
        fontSize: 20,
    },
    senderName: {
        color: "#DF5454",
        fontWeight: "bold"
    },
    textInput: {
        backgroundColor: "lightgray",
        color: "black",
        borderRadius: 10,
        marginBottom: 20,
        width: 250
    },
    errorText: {
        height: 35,
        color: "red",
        flexWrap: "wrap",

    }
});

export default WebSocketService;

/*
useEffect(() => {
    if(ws !== null) {
        ws.onopen = () => {
            ws.send('something');
        };
        ws.onclose = (e) => {
        };
        ws.onerror = (e) => {
            console.log(e.message);
        };
        ws.onmessage = async (e) => {
            if(e.data === "press timer") {
                await handlePress();
            };
            console.log(e.data);
        };
    }
}, [ws, timerRunning]);
*/