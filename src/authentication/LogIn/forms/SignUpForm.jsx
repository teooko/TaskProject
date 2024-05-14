import React from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from "react-native";
import {Formik} from "formik";
import * as yup from "yup";
import {useDispatch} from "react-redux";
import {menus} from "../../../constants";
import {goToPage} from "../../../store/layoutSlice";
import AuthenticationButton from "../components/AuthenticationButton";
import {postRegister} from "../../../store/accountSlice";

const SignUpForm = () => {
    const dispatch = useDispatch();
    //TODO: go to extra user data from here
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => {
                console.log(values);
                dispatch(postRegister(values));
                dispatch(goToPage(menus.authenticate));
            }}
            validationSchema={yup.object().shape({
                email: yup.string().email('Invalid email').required('Email is required'),
                password: yup.string().min(6, 'Password must be at least 6 characters')
                    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                    .matches(/[0-9]/, 'Password must contain at least one digit')
                    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one symbol')
                    .required('Password is required'),
            })}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={styles.signUpForm}>
                    <View style={styles.signUpFormInput}>
                        <Text style={styles.title}>Sign up</Text>
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
export default SignUpForm;