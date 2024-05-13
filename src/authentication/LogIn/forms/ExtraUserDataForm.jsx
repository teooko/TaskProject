import {KeyboardAvoidingView, StyleSheet, Text, TextInput, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {useDispatch, useSelector} from "react-redux";
import * as yup from "yup";
import {Formik} from "formik";
import {useEffect} from "react";
import Home from "../../../pages/Home";
import {postUserClaims, resetUserData} from "../../../store/accountSlice";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import SelectProfilePicture from "../components/SelectProfilePicture";
import AuthenticationButton from "../components/AuthenticationButton";

const ExtraUserDataForm = ({navigation}) => {
    const dispatch = useDispatch();
    const {bearerToken, username} = useSelector(state => state.account);
    
    useEffect(() => {
        if(username !== null)
            navigation.navigate(Home);
    }, []);
    const handleNavigation = () => {
        dispatch(resetUserData());
        navigation.navigate("Log out");
    };
    
    return (
            <LinearGradient colors={['#E97C6F', '#FFC165']} style={styles.gradient}>
                <KeyboardAvoidingView behavior={"position"} >
                    <Navigation skipButtonVisible={false} backButtonVisible={true} handleNavigation={handleNavigation} />
                    <Logo />
                    <Formik
                        initialValues={{profilePicturePath: '', username: '', profilePictureBase64: '' }}
                        onSubmit={(values, {setSubmitting}) => {
                            setSubmitting(false);
                            dispatch(postUserClaims({bearerToken, values}));
                        }}
                        validationSchema={yup.object().shape({
                            username: yup.string().required('User name is required'),
                        })}
                    >
                        {({ isSubmitting, setFieldValue, handleChange, handleBlur, handleSubmit, values, errors }) => 
                            (
                            <View style={styles.signUpForm}>
                                <SelectProfilePicture isSubmitting={isSubmitting} setFieldValue={setFieldValue}/>
                                    <View style={styles.textInputWrapper}>
                                        <Text style={styles.textInputLabel}>User name</Text>
                                        <TextInput
                                            placeholder="User name"
                                            style={styles.textInput}
                                            placeholderTextColor="#E97C6F"
                                            onChangeText={handleChange('username')}
                                            onBlur={handleBlur('username')}
                                            value={values.username}
                                        />
                                        {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
                                    </View>
                                <AuthenticationButton title="Submit" handlePress={handleSubmit} isSubmitting = {isSubmitting}/>
                            </View>
                            )}
                    </Formik>
                </KeyboardAvoidingView>
            </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        height: "100%",
    },
    signUpForm: {
        display: "flex",
        alignItems: "center",
        gap: 20,
        marginLeft: "auto",
        marginRight: "auto"
    },
    textInput: {
        backgroundColor: "white",
        borderColor: "#E97C6F",
        borderWidth: 1,
        borderRadius: 10,
        color: "black",
        width: 300,
        height: 50,
        marginTop: 5,
    },
    textInputWrapper: {
        display: "flex",
        flexWrap: "wrap",
    },
    textInputLabel: {
        color: "white",
    },
    errorText: {
        width: 300,
        height: 35,
        color: "red",
        flexWrap: "wrap",

    },
})

export default ExtraUserDataForm;