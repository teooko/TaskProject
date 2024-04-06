import {
    cancelAnimation,
    Easing,
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import {useSelector} from "react-redux";

const useAnimatedRise = duration => {
    const offset = useSharedValue(310);
    const {currentTime} = useSelector(state => state.timer);
    const riseAnimationStyle = useAnimatedProps(() => ({
        transform: [{translateY: offset.value}],
    }));

    const startAnimation = () => {
        offset.value = withTiming(0, {
            duration: currentTime * 1000,
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
