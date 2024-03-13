import Svg, {Path} from 'react-native-svg';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Wave = ({color}) => {
    const leftPositions = [-100, 0, 100, 200, 300];
    const waves = leftPositions.map(leftPosition => (
        <Svg
            height="20"
            width="100%"
            style={{...styles.squiggly, left: leftPosition}}
            key={leftPosition}>
            <Path d="M0,10 C50,30 50,-10 100,10 L100,0 L0,0 Z" fill={color} />
            <View
                style={{
                    width: 100,
                    height: 20,
                    backgroundColor: color,
                    bottom: -1,
                    position: 'absolute',
                }}
            />
        </Svg>
    ));

    return <>{waves}</>;
};

const styles = StyleSheet.create({
    squiggly: {
        position: 'absolute',
        bottom: 0,
        transform: [{scaleY: -1}],
    },
});
export default Wave;
