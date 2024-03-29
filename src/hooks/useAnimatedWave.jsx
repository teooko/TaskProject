﻿import {
    cancelAnimation,
    Easing,
    ReduceMotion,
    useAnimatedProps,
    useSharedValue,
    withRepeat,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const useAnimatedWave = (initialValue, toValue, duration) => {
    const offsetX = useSharedValue(initialValue);
    const offsetY = useSharedValue(20);

    const animatedStyle = useAnimatedProps(() => ({
        transform: [{translateX: offsetX.value}, {translateY: offsetY.value}],
    }));

    const startAnimation = () => {
        offsetX.value = 0;
        offsetX.value = withRepeat(
            withTiming(toValue, {
                duration: duration,
                easing: Easing.inOut(Easing.linear),
            }),
            0,
        );
        offsetY.value = withRepeat(
            withSpring(0, {
                mass: 1,
                damping: 8,
                stiffness: 120,
            }),
            1,
        );
    };

    const stopAnimation = () => {
        offsetY.value = withTiming(20, {
            mass: 1,
            damping: 2,
            stiffness: 50,
        });
    };

    return [animatedStyle, startAnimation, stopAnimation];
};

export default useAnimatedWave;
