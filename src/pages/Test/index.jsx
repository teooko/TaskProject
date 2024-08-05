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
        dayComponentHeight={200}
        dayContainerStyle={{ height: 200 }}
        calendarAnimation={{type: 'parallel', duration: 30}}
        daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
        style={{height: 300, paddingTop: 20, paddingBottom: 10}}
        calendarHeaderStyle={{color: 'white'}}
        calendarColor={'#7743CE'}
        //dateNumberStyle={{fontSize: 30, color: '#560D0D', }}
        //dateNameStyle={{color: '#560D0D', fontSize: 15}}
        highlightDateNumberStyle={{color: 'yellow'}}
        highlightDateNameStyle={{color: 'yellow'}}
        disabledDateNameStyle={{color: 'grey'}}
        disabledDateNumberStyle={{color: 'grey'}}
        dayComponent={(props) => <DayCard props={props} />}
        // datesWhitelist={datesWhitelist}
        // datesBlacklist={datesBlacklist}
        // iconLeft={require('./img/left-arrow.png')}
        // iconRight={require('./img/right-arrow.png')}
        responsiveSizingOffset={30}
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