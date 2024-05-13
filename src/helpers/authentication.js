import {getUserClaims} from "../store/accountSlice";
import {useSelector} from "react-redux";

export const checkAuthentication = (bearerToken) => {
    return bearerToken !== null;
}
export const checkClaims = async (bearerToken) => {
    await getUserClaims(bearerToken);
    const {username} = useSelector(state => state.account);
    return username !== null;
}

//refreshAppState

//hasUserData

//HOC