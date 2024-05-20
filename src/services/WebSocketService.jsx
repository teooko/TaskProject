import {useEffect, useState} from "react";
import React from 'react';
import {Alert, Modal, Pressable, View} from "react-native";
import {useSelector} from "react-redux";

const [ws, setWs] = useState(null);
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
}
const WebSocketService = ({children}) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View>
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