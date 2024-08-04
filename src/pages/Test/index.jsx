import CalendarStrip from 'react-native-calendar-strip';
import DayCard from "./DayCard";
import {useGetPastYearTasksQuery} from "../../store/api";
import {Text} from "react-native";
const Test = () => {
    const {data, isLoading, error} = useGetPastYearTasksQuery();
    return ( !isLoading ? <CalendarStrip
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
        markedDates={[{
            "$id": "1",
            "2024-05-14T00:00:00": {
                "$id": "2",
                "$values": ["#72fff9"]
            },
            "2024-05-20T00:00:00": {
                "$id": "3",
                "$values": ["#72fff9"]
            },
            "2024-07-01T00:00:00": {
                "$id": "6",
                "$values": ["#970fff"]
            },
            "2024-07-02T00:00:00": {
                "$id": "4",
                "$values": ["#72fff9", "#970fff", "#50a6ff"]
            },
            "2024-07-15T00:00:00": {
                "$id": "9",
                "$values": ["#50a6ff"]
            },
            "2024-07-19T00:00:00": {
                "$id": "5",
                "$values": ["#72fff9", "#970fff"]
            },
            "2024-07-23T00:00:00": {
                "$id": "7",
                "$values": ["#970fff"]
            },
            "2024-08-01T00:00:00": {
                "$id": "8",
                "$values": ["#970fff"]
            },
            "2024-08-02T00:00:00": {
                "$id": "10",
                "$values": ["#ffc43b"]
            }
        }]}
    /> :
    <Text>
        se incarca
    </Text>)
}

export default Test;