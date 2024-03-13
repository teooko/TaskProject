import {
    cancelAnimation,
    Easing,
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const useAnimatedRise = duration => {
    const offset = useSharedValue(310);

    const riseAnimationStyle = useAnimatedProps(() => ({
        transform: [{translateY: offset.value}],
    }));

    const startAnimation = () => {
        offset.value = withTiming(0, {
            duration: duration,
            easing: Easing.inOut(Easing.linear),
        });
    };

    const stopAnimation = () => {
        cancelAnimation(offset);
    };

    const resetAnimation = () => {
        offset.value = withTiming(310, {
            duration: 1000,
            easing: Easing.inOut(Easing.linear),
        });
    };
    return [riseAnimationStyle, startAnimation, stopAnimation, resetAnimation];
};

export default useAnimatedRise;
