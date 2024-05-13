import React from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from "react-native";
import {Formik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {postLogIn} from "../../../store/accountSlice";
import AuthenticationButton from "../components/AuthenticationButton";

const LogInForm = ({menus, setMenu}) => {
    const dispatch = useDispatch();
    const {bearerToken} = useSelector(state => state.account);
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => {
                console.log(values);
                dispatch(postLogIn(values));
                //setMenu(menus.authenticate);
            }}
            validationSchema={yup.object().shape({
                email: yup.string().email('Invalid email').required('Email is required'),
                password: yup.string().required('Password is required'),
            })}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={styles.signUpForm}>
                    <View style={styles.signUpFormInput}>
                        <Text style={styles.title}>Log in</Text>
                        <View style={styles.textInputWrapper}>
                            <Text style={styles.textInputLabel}>Email</Text>
                            <TextInput
                                placeholder="Email"
                                style={styles.textInput}
                                placeholderTextColor="#E97C6F"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                autoCapitalize="none"
                            />
                            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                        </View>
                        <View style={styles.textInputWrapper}>
                            <Text style={styles.textInputLabel}>Password</Text>
                            <TextInput
                                placeholder="Password"
                                style={styles.textInput}
                                placeholderTextColor="#E97C6F"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry
                            />
                            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                        </View>
                    </View>
                    <AuthenticationButton title="Submit" handlePress={handleSubmit} />
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    signUpForm: {
        display: "flex",
        alignItems: "center",
        gap: 20,
        marginLeft: "auto",
        marginRight: "auto"
    },
    signUpFormInput: {
        display: "flex",
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
    title: {
        fontSize: 18,
        color: "white"
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

    }
})
export default LogInForm;