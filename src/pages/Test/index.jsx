import CalendarStrip from 'react-native-calendar-strip';
import DayCard from "./DayCard";
import {useGetPastYearTasksQuery} from "../../store/api";
import {Text} from "react-native";
const Test = () => {
    const {data, isLoading, error} = useGetPastYearTasksQuery();
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return ( !isLoading && data ? <CalendarStrip
        dayComponentHeight={160}
        style={{height: 160}}
        calendarHeaderStyle={{
            color: 'white',
            fontSize: 15,
            alignSelf: "flex-start",
            paddingLeft: 5,
            marginBottom: 90
        }}
        calendarColor={'#7743CE'}
        dayComponent={(props) => <DayCard props={props} />}
        responsiveSizingOffset={40}
        scrollable
        iconContainer={{flex: 0}}
        leftSelector={[]}
        rightSelector={[]}
        markedDates={[data]}
        selectedDate={today}
    /> :
    <Text>
        se incarca
    </Text>)
}

export default Test;