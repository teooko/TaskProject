import {useDispatch, useSelector} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import {Dimensions, KeyboardAvoidingView, StyleSheet} from "react-native";
import LogInForm from "./forms/LogInForm";
import SignUpForm from "./forms/SignUpForm";
import AuthenticationButtons from "./components/AuthenticationButtons";
import Logo from "./components/Logo";
import Navigation from "./components/Navigation";
import {menus} from "../../constants";
import ExtraUserDataForm from "./forms/ExtraUserDataForm";
import {goToPage} from "../../store/layoutSlice";
import {useEffect} from "react";

const LogIn = () => {
    //TODO: rename component and check for username here
    const {menu} = useSelector(state => state.layout);
    const {userName, bearerToken} = useSelector(state => state.account);
    const dispatch = useDispatch();

    const isAuthenticated = bearerToken !== null;
    const hasClaims = userName !== null;
    
    useEffect(() => {
        if(isAuthenticated && !hasClaims)
        {
            dispatch(goToPage(menus.extraUserData));
        }
    }, []);
    const handleNavigation = () => {
        dispatch(goToPage(menus.authenticate));
    }
    //TODO: automatically log in on sign up
    return (
            <LinearGradient colors={['#E97C6F', '#FFC165']} style={styles.gradient}>
                <KeyboardAvoidingView behavior={"position"}>
                    <Navigation skipButtonVisible={!(menu === menus.extraUserData)} backButtonVisible={!(menu === menus.authenticate)} handleNavigation={handleNavigation}/>
                    <Logo/>
                    {menu === menus.authenticate && <AuthenticationButtons />}
                    {menu === menus.signUp && <SignUpForm />}
                    {menu === menus.logIn && <LogInForm />}
                    {menu === menus.extraUserData && <ExtraUserDataForm />}
                </KeyboardAvoidingView> 
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