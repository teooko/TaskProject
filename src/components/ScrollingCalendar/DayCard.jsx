import {Pressable, StyleSheet, Text, View} from 'react-native';
import {constants} from './constants';
import {useDispatch, useSelector} from 'react-redux';
import {selectDay} from '../../store/slice';
import {fetchDailyTasks, setSelectedDate} from '../../store/tasksSlice';
import {SvgXml} from 'react-native-svg';
import {icons} from '../../assets/Icons';
const DayCard = ({id}) => {
    const {days, selected} = useSelector(state => state.calendar);
    const dispatch = useDispatch();
    const handlePress = () => {
        dispatch(selectDay(id));
        dispatch(
            setSelectedDate(`${days.daysById[id].year}-${days.daysById[id].month + 1}-${
                    days.daysById[id].monthDay}`
            ),
        );
    };

    const firstThreeTasks = days.daysById[id].colors?.slice(0, 3);

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
            <View style={styles.taskCircles}>
                {firstThreeTasks?.map((color, index) => (
                    <SvgXml
                        xml={icons.circle}
                        width={13}
                        height={13}
                        fill={color}
                        key={index}
                    />
                ))}
                {days.daysById[id].colors?.length > 3 ? (
                    <SvgXml
                        xml={icons.chevronCircleRight}
                        width={13}
                        height={13}
                        fill={selected === id ? '#DF5454' : `#560D0D`}
                    />
                ) : null}
            </View>
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
        justifyContent: 'center',
    },
    taskCircles: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
    },
});

export default DayCard;
