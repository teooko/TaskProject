import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {icons} from '../../assets/Icons';
import {calendarNames} from "../../constants";
const DayCard = ({props}) => {
    let dayNumber, dayName;
    const date = new Date(props.date);
    dayNumber = date.getDate();
    dayName = date.getDay();
    
    //TODO replace temporary solution (i need to figure out how to change the timestamp format of the calendar strip)
    const dateString = date.toJSON().slice(0,-5);
    const newDateString = dateString.replace("T09", "T00");
    //----------------------------------------------------------------------------------
    
    const markedDates = props.markedDates[0];
    const colors = markedDates[newDateString] && markedDates[newDateString].$values;

    return (
        <Pressable style={styles.card} onPress={() => props.onDateSelected(props.date)}>
            <Text
                style={
                    props.selected
                        ? {...styles.weekDay, ...styles.cardSelected}
                        : styles.weekDay
                }>
                {calendarNames.weekDays[dayName]}
            </Text>
            <Text
                style={
                    props.selected
                        ? {...styles.monthDay, ...styles.cardSelected}
                        : styles.monthDay
                }>
                {dayNumber}
            </Text>
            <View style={styles.taskCircles}>
                {colors?.slice(0, 3).map((color, index) => (
                    <SvgXml
                        xml={icons.circle}
                        width={13}
                        height={13}
                        fill={color}
                        key={index}
                    />
                ))}
                {colors?.length > 3 ? (
                    <SvgXml
                        xml={icons.chevronCircleRight}
                        width={13}
                        height={13}
                        fill={props.selected ? '#DF5454' : `#560D0D`}
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
