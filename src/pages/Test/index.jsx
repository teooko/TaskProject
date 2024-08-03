import CalendarStrip from 'react-native-calendar-strip';

const Test = () => {
    
    return ( <CalendarStrip
        calendarAnimation={{type: 'parallel', duration: 30}}
        daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
        style={{height: 100, paddingTop: 20, paddingBottom: 10}}
        calendarHeaderStyle={{color: 'white'}}
        calendarColor={'#7743CE'}
        dateNumberStyle={{color: 'white'}}
        dateNameStyle={{color: 'white'}}
        highlightDateNumberStyle={{color: 'yellow'}}
        highlightDateNameStyle={{color: 'yellow'}}
        disabledDateNameStyle={{color: 'grey'}}
        disabledDateNumberStyle={{color: 'grey'}}
        // datesWhitelist={datesWhitelist}
        // datesBlacklist={datesBlacklist}
        // iconLeft={require('./img/left-arrow.png')}
        // iconRight={require('./img/right-arrow.png')}
        scrollable
        iconContainer={{flex: 0.1}}
    />)
}

export default Test;