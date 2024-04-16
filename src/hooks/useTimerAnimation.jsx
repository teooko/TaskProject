import {useSelector} from "react-redux";
import UseAnimatedWave from "./useAnimatedWave";
import useAnimatedRise from "./useAnimatedRise";

const UseTimerAnimation = () => {
    const {time} = useSelector(state => state.timer);
    // TODO: extract this and then use a single animation for both waves
    const [frontWaveStyle, startFrontAnimation, stopFrontAnimation] =
        UseAnimatedWave(0, 100, 1000);
    const [backWaveStyle, startBackAnimation, stopBackAnimation] =
        UseAnimatedWave(0, -100, 1700);
    const [riseAnimationStyle, startRise, stopRise, resetRise] =
        useAnimatedRise(time * 1000);
    
    const startTimerAnimation = () => {
        startFrontAnimation();
        startBackAnimation();
        startRise();
    }
    
    const stopTimerAnimation = () => {
        stopRise();
        stopFrontAnimation();
        stopBackAnimation();
    }
    
    const resetTimerAnimation = () => {
        stopFrontAnimation();
        stopBackAnimation();
        resetRise();
    }
    
    return {startTimerAnimation, stopTimerAnimation, resetTimerAnimation, frontWaveStyle, backWaveStyle, riseAnimationStyle};
}

export default UseTimerAnimation;