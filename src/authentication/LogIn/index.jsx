import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {getUserClaims, resetBearerToken} from "../../store/accountSlice";
import Loading from "../Loading";
import LinearGradient from "react-native-linear-gradient";
import {Dimensions, KeyboardAvoidingView, StyleSheet} from "react-native";
import Navigation from "./Navigation";
import Logo from "./Logo";
import AuthenticationButtons from "./AuthenticationButtons";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";


const LogIn = () => {
    const menus = {
        authenticate: "authenticate",
        logIn: "logIn",
        signUp: "signUp",
        extraUserData: "extraUserData"
    }
    const dispatch = useDispatch();
    const {bearerToken} = useSelector(state => state.account);
    
    const [menu, setMenu] = useState(menus.authenticate);
    
    useEffect(() => {
        if(bearerToken !== null) {
            dispatch(getUserClaims(bearerToken));
            setTimeout(() => {
                dispatch(getUserClaims(bearerToken));
                //navigation.navigate(Loading);
            }, 100);
        }
    }, [bearerToken]);

    const handleNavigation = () => {
        setMenu(menus.authenticate);
    };
    useEffect(() => {
        resetBearerToken();
    }, []);
    return (
            <LinearGradient colors={['#E97C6F', '#FFC165']} style={styles.gradient}>
                {/*<KeyboardAvoidingView behavior={"position"}>
                    <Navigation skipButtonVisible={true} backButtonVisible={(menu === menus.logIn ||
                        menu === menus.signUp)} handleNavigation={handleNavigation}/>
                    <Logo/>
                    {menu === menus.authenticate && <AuthenticationButtons menus={menus} setMenu={setMenu}/>}
                    {menu === menus.signUp && <SignUpForm menus={menus} setMenu={setMenu}/>}
                    {menu === menus.logIn && <LogInForm menus={menus} setMenu={setMenu}/>}
                </KeyboardAvoidingView> */}
            </LinearGradient>
    );
};

const styles = StyleSheet.create({
    logo: {
        marginLeft: "auto",
        marginRight: "auto"
    },
    logoWrapper: {
        width: "100%", 
        height: Dimensions.get('window').width / 2, 
        marginTop: 70
    },
    text: {
        color: "white",
        fontSize: 18,
    },
    gradient: {
        height: "100%"
    },
    navigation: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignContent: "space-between",
        justifyContent: "space-between",
        padding: 10
    }
})
export default LogIn;