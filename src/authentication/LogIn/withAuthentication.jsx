import LogIn from "./index";
import Loading from "../Loading";

export const withAuthentication = () => {
    return () => {
        const isAuthenticated = checkAuthentication();
        if (!isAuthenticated) {
            return <LogIn />;
        }
        return <Loading />;
    };
};