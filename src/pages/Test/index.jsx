import React, {useState} from 'react';
import { View, Text, Button } from 'react-native';
import { Formik } from 'formik';
import ImagePicker from 'react-native-image-picker';
import CountDown from "react-native-countdown-fixed";

const ImageForm = () => {
    const [running, setRunning] = useState(false);
    return (
        <>
        <CountDown
            size={30}
            until={1000}
            onFinish={() => alert('Finished')}
            digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
            digitTxtStyle={{color: '#1CC625'}}
            timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
            separatorStyle={{color: '#1CC625'}}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{m: null, s: null}}
            showSeparator
            running={running}
        />
            <Button title={"start/stop"} onPress={() => setRunning(running => !running)}/>
        </>
    )
};

export default ImageForm;
