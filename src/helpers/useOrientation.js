import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {useDispatch} from "react-redux";
import {setOrientationLandscape, setOrientationPortrait} from "../store/deviceInfoSlice";

const useOrientation = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        Dimensions.addEventListener('change', ({window:{width,height}})=>{
            if (width<height) {
                dispatch(setOrientationPortrait());
            } else {
                dispatch(setOrientationLandscape());
            }
        })
    }, []);

}

export default useOrientation;