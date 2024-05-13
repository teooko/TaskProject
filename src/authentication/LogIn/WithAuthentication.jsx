import LogIn from "./index";
import Loading from "../Loading";
import {useDispatch, useSelector} from "react-redux";
import {checkAuthentication, checkClaims} from "../../helpers/authentication";
import {goToExtraData} from "../../store/layoutSlice";

const WithAuthentication = () => {
    const dispatch = useDispatch();
    const {bearerToken} = useSelector(state => state.account);
    const isAuthenticated = checkAuthentication(bearerToken);
    const hasClaims = checkClaims(bearerToken);
    
    if (!isAuthenticated)
        return <LogIn />;
    else if(!hasClaims) {
        dispatch(goToExtraData);
        return <LogIn />;
    }
    return <Loading />;
};

export default WithAuthentication;