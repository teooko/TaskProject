import React, {useEffect, useState} from 'react';
import {Dimensions, KeyboardAvoidingView, Text, TextInput, View} from "react-native";
import {StyleSheet} from "react-native";
import {Formik} from "formik";
import {postUserClaims} from "../../store/accountSlice";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import SelectProfilePicture from "../../authentication/Authentication/components/SelectProfilePicture";
import AuthenticationButton from "../../authentication/Authentication/components/AuthenticationButton";

const RightDrawerContent = () => {
    const dispatch = useDispatch();
    const {bearerToken, userName, profilePicturePath} = useSelector(state => state.account);
    
    return (
        <View style={styles.contentWrapper}>
            <KeyboardAvoidingView behavior={"position"} >
                <Formik
                    initialValues={{username: userName, profilePicturePath: profilePicturePath}}
                    onSubmit={(values, {setSubmitting}) => {
                        setSubmitting(false);
                        dispatch(postUserClaims({bearerToken, values}));
                    }}
                    validationSchema={yup.object().shape({
                        username: yup.string().required('User name is required'),
                    })}
                    enableReinitialize={true}
                >
                    {({ isSubmitting, setFieldValue, handleChange, handleBlur, handleSubmit, values, errors }) =>
                        (
                            <View style={styles.signUpForm}>
                                <SelectProfilePicture isSubmitting={isSubmitting} setFieldValue={setFieldValue}/>
                                <View style={styles.textInputWrapper}>
                                    <Text style={styles.textInputLabel}>User name</Text>
                                    <TextInput
                                        placeholder={"User Name"}
                                        style={styles.textInput}
                                        placeholderTextColor="#E97C6F"
                                        onChangeText={handleChange('username')}
                                        onBlur={handleBlur('username')}
                                        value={values.username}
                                    />
                                    {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
                                </View>
                                <AuthenticationButton title="Save changes" handlePress={handleSubmit} isSubmitting = {isSubmitting}/>
                            </View>
                        )}
                </Formik>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    contentWrapper: {
        width: "100%",
        height: "100%",
        backgroundColor: "#DF5454",
        
    },
    textInput: {
      color: "white"
    },
    signUpForm: {
        height: (Dimensions.get("window").height) / 2,
        marginTop: 40,
        marginBottom: 40,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
    },
    textInputWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap"
    }
})
export default RightDrawerContent;