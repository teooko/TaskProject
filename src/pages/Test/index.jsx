import {Pressable, Text, View} from "react-native";
import CountDown from "react-native-countdown-fixed";
import {openPicker, setCurrentTime, startTimer, stopTimer} from "../../store/timerSlice";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {SvgXml} from "react-native-svg";
import {icons} from "../../assets/Icons";
const Test = () => {
    const id = React.useRef(new Date().getTime().toString()).current;

    const [timerRunning, setTimerRunning] = useState(false);
    const [pressed, setPressed] = useState(false);

    const timerRef = useRef(null); // Use useRef to persist timer ID

    const toggleTimer = () => {
        setPressed((state) => !state);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        if(timerRunning)
            setTimerRunning(false);
        else
            timerRef.current = setTimeout(() => {
                setTimerRunning(prevState => !prevState);
                setPressed(!timerRunning);
            }, 500);
    };

    const {start, pause} = icons;
    return (
        <View>
            <CountDown
                id={id}
                size={40}
                until={100}
                //style={styles.timer}
                onFinish={() => console.log("finished")}
                digitStyle={{width: 50}}
                digitTxtStyle={{color: 'black'}}
                separatorStyle={{color: "black"}}
                timeToShow={['H', 'M', 'S']}
                timeLabels={{m: null, s: null}}
                showSeparator
                running={timerRunning}
                onPress={() => console.log("pressed")}
                onChange={(value) => console.log(value)}
            />
            <Pressable style={{alignSelf: "center"}} onPress={toggleTimer}>
                <SvgXml xml={pressed ? pause : start} width={50} height={50}/>
            </Pressable>
        </View>)
}

export default Test;