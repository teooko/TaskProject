import {Button, Text, View} from "react-native";
import Page from "../Page";
import React, {useEffect, useState} from "react";
import {StyleSheet} from "react-native";

function Timer({ navigation }) {
    const [started, setStarted] = useState(false);
    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0);
    
    useEffect(() => {
        let timer;
        if (started)
            timer = setInterval(() => {
                if (minutes > 0) {
                        if (seconds === 0) {
                            setSeconds(59);
                            setMinutes(minutes - 1);
                        } else {
                            setSeconds(seconds - 1);
                        }
                        
                }
                else if (seconds > 0) {
                        setSeconds(seconds - 1);
                }
                else {
                    setStarted(false);
                    clearInterval(timer);
                }
            }, 1000);
        
        return () => clearInterval(timer);
    }, [started, minutes, seconds]);
    return (
        <View>
            <Page navigation={navigation}>
                <Text style={styles.timer}>
                    {minutes > 9 ? minutes : "0" + minutes} : {seconds > 9 ? seconds : "0" + seconds}
                </Text>
                <Button title={started ? "stop" : "start"} onPress={() => setStarted(!started)}/>
            </Page>
        </View>
    );
}

const styles = StyleSheet.create({
    timer: {
        fontSize: 80,
        color: "white",
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "auto",
        marginRight: "auto",
    }
})
export default Timer