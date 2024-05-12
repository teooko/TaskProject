import {useEffect, useState} from "react";
import React from 'react';
import {View} from "react-native";
import {useSelector} from "react-redux";

const [ws, setWs] = useState(null);
const [invitation, setInvitation] = useState(null);

const {username} = useSelector(state => state.account);
const connect = () => {
    setWs(new WebSocket('ws://192.168.100.8:8080'));
}
useEffect(() => {
    connect();
}, []);

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
    return (
        <View>
            <View>
            </View>
            
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