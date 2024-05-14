import { useSelector } from 'react-redux';
import RightDrawer from "../../pages/Page/RightDrawer";
import Authentication from "./index";

const WithAuthentication = () => {
    const { bearerToken, userName } = useSelector(state => state.account);

    const isAuthenticated = bearerToken !== null;
    const hasClaims = userName !== null;
    
    if (!isAuthenticated || !hasClaims)
        return <Authentication />;
    return <RightDrawer />;
};

export default WithAuthentication;
