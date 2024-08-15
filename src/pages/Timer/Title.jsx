import React from 'react';
import {Text} from "react-native";

const Title = ({isBreak}) => {
    const sessionTitles = {
        work: "Time to work",
        break: "Time to take a break"
    }
    return (
        <Text style={{fontSize: 30, color: "white", marginTop: 70, marginLeft: "auto", marginRight: "auto"}}>
            {isBreak ? sessionTitles.break : sessionTitles.work}
        </Text>
    );
};

export default Title;