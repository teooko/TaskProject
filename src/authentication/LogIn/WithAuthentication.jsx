import LogIn from "./index";
import Loading from "../Loading";
import {useDispatch, useSelector} from "react-redux";
import {checkClaims} from "../../helpers/authentication";
import {goToPage} from "../../store/layoutSlice";
import {menus} from "../../constants";

const WithAuthentication = () => {
    const dispatch = useDispatch();
    const {bearerToken} = useSelector(state => state.account);
    const isAuthenticated = bearerToken !== null;
    const hasClaims = bearerToken !== null && checkClaims(bearerToken);
    
    if (!isAuthenticated)
        return <LogIn />;
    else if(!hasClaims) {
        dispatch(goToPage(menus.extraUserData));
        return <LogIn />;
    }
    return <Loading />;
};

export default WithAuthentication;