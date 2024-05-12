import LogIn from "./index";
import Loading from "../Loading";
import {useSelector} from "react-redux";
import {checkAuthentication} from "../../helpers/authentication";

const WithAuthentication = () => {
    const {bearerToken} = useSelector(state => state.account);
    const isAuthenticated = checkAuthentication(bearerToken);
    if (!isAuthenticated)
        return <LogIn />;
    return <Loading />;
};

export default WithAuthentication;