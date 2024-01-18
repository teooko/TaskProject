import {Easing, useAnimatedProps, useSharedValue, withRepeat, withTiming} from "react-native-reanimated";

const useAnimatedWave = (initialValue, toValue, duration) => {
    const offset = useSharedValue(initialValue);
    
    const animatedStyle = useAnimatedProps(() => ({
        transform: [{translateX: offset.value}],
    }))
    
    const startAnimation = () => {
        offset.value = withRepeat(withTiming(toValue, {duration: duration, easing: Easing.inOut(Easing.linear)}), -1);
    }
    
return [animatedStyle, startAnimation];
}

export default useAnimatedWave;