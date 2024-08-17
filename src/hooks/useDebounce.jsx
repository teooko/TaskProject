import {useEffect} from "react";

export default (fnc, time, condition) => {
    useEffect(() => {
        let timer;
        if(condition)
            timer = setTimeout(() => fnc(),
           time);
       return () => {
           if (timer) {
               clearTimeout(timer)
           }
       };
    },[fnc, time, condition])
}