﻿import React, {useCallback} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import DayCard from './DayCard';
import {useDispatch, useSelector} from 'react-redux';
import {changeHeader, fetchWeeklyTasks, insertDays} from '../../store/slice';
import {FlashList} from '@shopify/flash-list';
const ScrollingDays = () => {
    const {data} = useSelector(state => state.calendar);
    const dispatch = useDispatch();
    const renderItem = useCallback(({item}) => <DayCard id={item} />, [data]);
    const onViewableItemsChanged = useCallback(viewableItems =>
        dispatch(changeHeader(viewableItems)),
    );
    const lastLoaded = useSelector(state => state.calendar.lastLoaded);
    const {bearerToken} = useSelector(state => state.account);
    // @ts-ignore
    return (
        <View style={styles.calendar}>
            <FlashList
                data={data}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                overScrollMode={'never'}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{viewAreaCoveragePercentThreshold: 100}}
                onEndReached={() => {
                    dispatch(insertDays());
                    dispatch(fetchWeeklyTasks({bearerToken, fromDate: lastLoaded}));
                }}
                onEndReachedThreshold={0.3}
                inverted={true}
                estimatedItemSize={90}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    calendar: {
        height: 110,
        marginTop: 10,
    },
});
export default ScrollingDays;
