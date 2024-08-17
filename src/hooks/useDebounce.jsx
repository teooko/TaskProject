import {useEffect} from "react";

export default (fnc, time, condition, args = []) => {
    useEffect(() => {
        let timer;
        if(condition)
            timer = setTimeout(() => fnc(...args),
           time);
       return () => {
           if (timer) {
               clearTimeout(timer)
           }
       };
    },[fnc, time, condition])
}