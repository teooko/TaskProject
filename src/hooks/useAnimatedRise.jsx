import {
    cancelAnimation,
    Easing,
    useAnimatedProps,
    useSharedValue,
    withTiming
} from "react-native-reanimated";

const useAnimatedRise = (duration) => {
    const offset = useSharedValue(300);
    let offsetPause;
    
    const riseAnimationStyle = useAnimatedProps(() => ({
        transform: [{translateY: offset.value}],
    }))

    const startAnimation = () => {
        offset.value = withTiming(0, {duration: duration, easing: Easing.inOut(Easing.linear)})
    }

    const stopAnimation = () => {
        cancelAnimation(offset);
        
    }
    
    return [riseAnimationStyle, startAnimation, stopAnimation]
}

export default useAnimatedRise;