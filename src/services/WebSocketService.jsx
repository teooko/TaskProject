import {useEffect, useState} from "react";
import React from 'react';
import {Alert, Modal, Pressable, View, StyleSheet, Text} from "react-native";
import {useSelector} from "react-redux";

/*
const [invitation, setInvitation] = useState(null);

const {username, bearerToken} = useSelector(state => state.account);
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
            ws.send('something');
        };
        ws.onclose = (e) => {
        };
        ws.onerror = (e) => {
            console.log(e.message);
        };
        ws.onmessage = async (e) => {
            console.log(e.data);
        };
    }
}, [ws]);

const sendInvitation = (ws, recipient, roomId) => {
    if(ws !== null) {
        ws.send(JSON.stringify({
                "sender": {username},
                "recipient": {recipient},
                "roomId": {roomId},
                }
            )
        )
    }
};

const receiveInvitation = (ws) => {
    ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if(username === data.recipient)
        {
            setInvitation({
               sender: data.sender,
                roomId: data.roomId
            });
        }
    }
}*/
const WebSocketService = ({children}) => {
    const [ws, setWs] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.wrapper}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
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
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    wrapper: {
        width: "100%",
        height: "100%"
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