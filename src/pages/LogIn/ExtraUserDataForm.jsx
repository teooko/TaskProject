import {KeyboardAvoidingView, StyleSheet, Text, TextInput, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {resetUserData} from "../../store/accountSlice";
import {useDispatch} from "react-redux";
import * as yup from "yup";
import AuthenticationButton from "./AuthenticationButton";
import {Formik} from "formik";
import SelectProfilePicture from "./SelectProfilePicture";
import Navigation from "./Navigation";
import Logo from "./Logo";

const ExtraUserDataForm = ({navigation}) => {
    const dispatch = useDispatch();
    const handleNavigation = () => {
        dispatch(resetUserData());
        navigation.navigate("Log out");
    };
    
    return (
            <LinearGradient colors={['#E97C6F', '#FFC165']} style={styles.gradient}>
                <KeyboardAvoidingView behavior={"position"} >
                    <Navigation skipButtonVisible={false} backButtonVisible={true} handleNavigation={handleNavigation} />
                    <Logo />
                    <SelectProfilePicture />
                    <Formik
                        initialValues={{ username: '' }}
                        onSubmit={(values) => {
                            console.log(values);
                            //dispatch(postLogIn(values));
                        }}
                        validationSchema={yup.object().shape({
                            username: yup.string().required('User name is required'),
                        })}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors }) => 
                            (
                            <View style={styles.signUpForm}>
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
                                <AuthenticationButton title="Submit" handlePress={handleSubmit} />
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