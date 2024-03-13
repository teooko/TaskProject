import React from 'react';
import {SvgXml} from 'react-native-svg';
import {icons} from '../../assets/Icons';
import {StyleSheet, Text, View} from 'react-native';

const TaskTitle = ({name}) => {
    return (
        <View style={styles.taskTitle}>
            <SvgXml
                xml={icons.chevronRight}
                width={'15'}
                height={'15'}
                style={styles.icon}
            />
            <Text style={styles.taskName}>{name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    taskName: {
        paddingLeft: 5,
        fontSize: 15,
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        fill: 'white',
    },
    taskTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
export default TaskTitle;
