import {ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setWorkSessionId} from '../../store/timerSlice';
import useOrientation from "../../helpers/useOrientation";
import {usePatchStopTimeStampMutation, usePostStartTimeStampMutation} from "../../store/api";
import HorizontalTimer from "./HorizontalTimer";
import VerticalTimer from "./VerticalTimer";

function Timer({navigation}) {
    const dispatch = useDispatch();
    const [result] = usePostStartTimeStampMutation();
    const [patchStopTimeStamp] = usePatchStopTimeStampMutation();
    const {time, reset, timerRunning, currentWorkSessionId} = useSelector(state => state.timer);

    useEffect(() => {
        if(result.data !== undefined)
            dispatch(setWorkSessionId(result.data.id));
    }, [result]);

    const handleStopTimer = async id => {
        try {
            await patchStopTimeStamp(id);
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleTimerFinished = () => {
        handleStopTimer(currentWorkSessionId);
        handleSkip();
    }
    
    const {orientation} = useSelector(state => state.deviceInfo);
    useOrientation();
    const [countDownId, setCountDownId] = useState(null);

    useEffect(() => {
        const id = new Date().getTime().toString()
        setCountDownId(id)
    }, [time, reset]);
    
    return (
        <ScrollView style={{flex: 1, height: "100%"}} contentContainerStyle={{ flexGrow: 1 }}>
            <HorizontalTimer countDownId={countDownId} 
                             orientation={orientation} 
                             handleTimerFinished={handleTimerFinished} 
                             time={time}
                             timerRunning={timerRunning}/>
            <VerticalTimer navigation={navigation}/>
        </ScrollView>
);
}
export default Timer;
