import CalendarStrip from 'react-native-calendar-strip';
import DayCard from "./DayCard";
import {Text} from "react-native";
import {useGetPastYearTasksQuery} from "../../../store/api";
const ScrollingCalendar = () => {
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
                marginBottom: 50
            }}
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

export default ScrollingCalendar;