import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getUserClaims} from "../../store/accountSlice";
import {menus} from "../../constants";
import {goToPage} from "../../store/layoutSlice";
import LogIn from "./index";
import Loading from "../Loading";
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
