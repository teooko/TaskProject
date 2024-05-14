import { useSelector } from 'react-redux';
import LogIn from "./index";
import RightDrawer from "../../pages/Page/RightDrawer";

const WithAuthentication = () => {
    const { bearerToken, userName } = useSelector(state => state.account);

    const isAuthenticated = bearerToken !== null;
    const hasClaims = userName !== null;
    
    if (!isAuthenticated || !hasClaims)
        return <LogIn />;
    return <RightDrawer />;
};

export default WithAuthentication;
