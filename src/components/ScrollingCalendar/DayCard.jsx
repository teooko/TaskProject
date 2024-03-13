﻿import {Pressable, StyleSheet, Text} from 'react-native';
import {constants} from './constants';
import {useDispatch, useSelector} from 'react-redux';
import {selectDay} from '../../store/slice';
import {fetchDailyTasks} from '../../store/tasksSlice';
const DayCard = ({id}) => {
    const {days, selected} = useSelector(state => state.calendarReducer);
    const dispatch = useDispatch();

    const handlePress = () => {
        dispatch(selectDay(id));
        dispatch(
            fetchDailyTasks(
                `${days.daysById[id].year}-${days.daysById[id].month + 1}-${
                    days.daysById[id].monthDay
                }`,
            ),
        );
    };
    return (
        <Pressable style={styles.card} onPress={handlePress}>
            <Text
                style={
                    selected === id
                        ? {...styles.weekDay, ...styles.cardSelected}
                        : styles.weekDay
                }>
                {constants.weekDays[days.daysById[id].weekDay]}
            </Text>
            <Text
                style={
                    selected === id
                        ? {...styles.monthDay, ...styles.cardSelected}
                        : styles.monthDay
                }>
                {days.daysById[id].monthDay}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        width: 80,
        height: 100,
        borderRadius: 15,
        marginLeft: 10,
    },
    cardSelected: {
        color: '#DF5454',
    },
    monthDay: {
        color: '#560D0D',
        fontSize: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    weekDay: {
        color: '#560D0D',
        fontSize: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: 10,
    },
});

export default DayCard;
