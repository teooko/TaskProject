import {Text, View} from 'react-native';
import React from 'react';
import {constants} from './constants';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';

const CalendarHeader = () => {
    const calendar = useSelector(state => state.calendarReducer);
    const {month, year} = calendar;
    return (
        <View>
            <Text style={styles.header}>
                {constants.months[month] + ' ' + year}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        color: 'white',
        paddingLeft: 5,
        fontSize: 15,
    },
});
export default CalendarHeader;
