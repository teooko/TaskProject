import {useEffect, useState} from 'react';

const useTimer = (initialMinutes, initialSeconds) => {
    const [started, setStarted] = useState(false);
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        let timer;
        if (started) {
            timer = setInterval(() => {
                if (minutes > 0) {
                    if (seconds === 0) {
                        setSeconds(59);
                        setMinutes(minutes - 1);
                    } else {
                        setSeconds(seconds - 1);
                    }
                } else if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else {
                    setStarted(false);
                    clearInterval(timer);
                }
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [started, minutes, seconds]);

    const startTimer = () => setStarted(true);
    const stopTimer = () => setStarted(false);

    return {
        started,
        minutes,
        seconds,
        startTimer,
        stopTimer,
        setMinutes,
        setSeconds,
    };
};

export default useTimer;
