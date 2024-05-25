import {useEffect, useState} from "react";
import React from 'react';
import {Alert, Modal, Pressable, View, StyleSheet, Text, TextInput, Button} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchGroupSessionData, getAnotherUserClaims,
    patchJoinGroupSession,
    postCreateGroupSession,
    setRoomId,
    triggerInvitationModal
} from "../store/webSocketSlice";
import {Formik} from "formik";
import * as yup from "yup";
import {getUserClaims} from "../store/accountSlice";

const WebSocketService = ({children}) => {
    const [ws, setWs] = useState(null);
    const [roomWs, setRoomWs] = useState(null);
    
    const [modalVisible, setModalVisible] = useState(false);
    const [invitation, setInvitation] = useState({
        sender: null,
        roomId: null
    });
    
    const {userName, bearerToken} = useSelector(state => state.account);
    const {showInvitationModal, roomId, connectionString, users, sendingMessage} = useSelector(state => state.webSocket);
    const dispatch = useDispatch();
    const connect = (connectionString) => {
        setWs(new WebSocket(connectionString));
    }
    useEffect(() => {
        if(bearerToken !== null)
        {
            connect(connectionString);
        }
    }, [bearerToken]);

    useEffect(() => {
        if(bearerToken !== null && roomId !== null)
        {
            setRoomWs(new WebSocket(connectionString + '/' + roomId));
            console.log(roomId);
        }
    }, [roomId]);

    useEffect(() => {
        if(ws !== null) {
            ws.onopen = () => {
                //ws.send('something');
            };
            ws.onclose = (e) => {
            };
            ws.onerror = (e) => {
                console.log(e.message + " GLOBAL SOCKET");
            };
            ws.onmessage = async (e) => {
                console.log(e.data + " GLOBAL SOCKET");
                receiveInvitation(e);
            };
        }
    }, [ws]);

    useEffect(() => {
        if(roomWs !== null) {
            roomWs.onopen = () => {
                roomWs.send('connected');
            };
            roomWs.onclose = (e) => {
            };
            roomWs.onerror = (e) => {
                console.log(e.message);
            };
            roomWs.onmessage = async (e) => {
                if(e.data === 'connected')
                    dispatch(fetchGroupSessionData(roomId)).then((response) => {
                        if(response.payload.userId1)
                        {
                            dispatch(getAnotherUserClaims({bearerToken, userId: response.payload.userId1}))
                        }
                        if(response.payload.userId2)
                        {
                            dispatch(getAnotherUserClaims({bearerToken, userId: response.payload.userId2}))
                        }
                        if(response.payload.userId3)
                        {
                            dispatch(getAnotherUserClaims({bearerToken, userId: response.payload.userId3}))
                        }
                        if(response.payload.userId4)
                        {
                            dispatch(getAnotherUserClaims({bearerToken, userId: response.payload.userId4}))
                        }
                    })
                console.log(e.data + " ROOM SOCKET");
            };
        }
    }, [roomWs]);

    useEffect(() => {
        if(sendingMessage !== null) {
            roomWs.send(sendingMessage);
        }
    }, [roomWs, sendingMessage]);
    const sendInvitation = (ws, recipient) => {
        if(ws !== null) {
            if(roomId === null)
                dispatch(postCreateGroupSession(bearerToken))
                    .then((response) => {
                        ws.send(JSON.stringify({
                                    "invitation":
                                        {
                                            "sender": userName,
                                            "recipient": recipient,
                                            "roomId": response.payload.id,
                                        }
                                }
                            )
                        )
                    })
            else ws.send(JSON.stringify({
                    "invitation":
                        {
                            "sender": userName,
                            "recipient": recipient,
                            "roomId": roomId,
                        }
                    }
                )
            )
        }
    };

    const receiveInvitation = (e) => {
            const data = JSON.parse(e.data);
            console.log("AIAE " + data);
            if(data.invitation) {
                if (userName === data.invitation.recipient) {
                    setInvitation({
                        sender: data.invitation.sender,
                        roomId: data.invitation.roomId
                    });
                    setModalVisible(true);
                }
            }
    }
    
    const handleAcceptInvitation = () => {
        setModalVisible(!modalVisible);
        console.log(invitation);
        dispatch(setRoomId(invitation.roomId));
        dispatch(patchJoinGroupSession({bearerToken, roomId: invitation.roomId}));
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
                                onPress={() => handleAcceptInvitation()}>
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
            <Button title={"press me"} onPress={() => roomWs.send("HALLO")} />
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