import {useDispatch, useSelector} from 'react-redux';
import RightDrawer from "../../pages/Page/RightDrawer";
import Authentication from "./index";
import {useStartup} from "../../hooks/useStartup";
import {resetCalendarState} from "../../store/slice";
import WebSocketService from "../../services/WebSocketService";

const WithAuthentication = () => {
    const { bearerToken, userName } = useSelector(state => state.account);
    useStartup();
    const isAuthenticated = bearerToken !== null;
    const hasClaims = userName !== null;

    if (!isAuthenticated || !hasClaims)
        return <Authentication />;
    return(
        <WebSocketService>
            <RightDrawer />
        </WebSocketService>
    );
};

export default WithAuthentication;
