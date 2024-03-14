import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import DayCard from './DayCard';
import {useDispatch, useSelector} from 'react-redux';
import {changeHeader, insertDays} from '../../store/slice';
import {FlashList} from '@shopify/flash-list';
const ScrollingDays = () => {
    const {data} = useSelector(state => state.calendar);
    const dispatch = useDispatch();
    const renderItem = useCallback(({item}) => <DayCard id={item} />, [data]);
    const onViewableItemsChanged = useCallback(viewableItems =>
        dispatch(changeHeader(viewableItems)),
    );

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
                onEndReached={() => dispatch(insertDays())}
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
