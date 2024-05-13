import {getUserClaims} from "../store/accountSlice";
import {useSelector} from "react-redux";
export const checkClaims = async (bearerToken) => {
    await getUserClaims(bearerToken);
    const {userName} = useSelector(state => state.account);
    return userName !== null;
}

//refreshAppState

//hasUserData

//HOC