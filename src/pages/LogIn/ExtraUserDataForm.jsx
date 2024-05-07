import React, {useState} from 'react';
import {Dimensions, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {SvgXml} from "react-native-svg";
import {icons} from "../../assets/Icons";
import {launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from "react-native-linear-gradient";
import {imageLibrary} from "react-native-image-picker/lib/typescript/platforms/web";
import {postLogIn, resetUserData, setProfilePicturePath} from "../../store/accountSlice";
import {useDispatch, useSelector} from "react-redux";
import * as yup from "yup";
import AuthenticationButton from "./AuthenticationButton";
import {Formik} from "formik";
import LogIn from "./index";

const ExtraUserDataForm = ({navigation}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();
    const {profilePicturePath} = useSelector(state => state.account);
    const selectImage = async() => {
        const options = {
          //  includeBase64: true
        }
        await launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response };
                setSelectedImage(source);
                dispatch(setProfilePicturePath({uri: source.uri.assets[0].uri}));
                //uploadImage(response);
            }
        });
    };
    
    return (
            <LinearGradient colors={['#E97C6F', '#FFC165']} style={styles.gradient}>
                <KeyboardAvoidingView behavior={"position"} >
                    <View style={styles.navigation}>
                        <Pressable onPress={() => {
                            dispatch(resetUserData());
                            navigation.navigate("Log out");
                        }}>
                            <Text style={styles.text}>
                                Back
                            </Text>
                        </Pressable>
                    </View>
                    <View style={styles.logoWrapper}>
                        <SvgXml
                            xml={icons.logo}
                            width={"90%"}
                            height={Dimensions.get('window').width / 4}
                            style={styles.logo}
                        />
                    </View>
                    <Pressable style={styles.selectProfilePictureWrapper} onPress={() => selectImage()} >
                        {profilePicturePath &&
                                <Pressable onPress={() => dispatch(setProfilePicturePath(null))} style={styles.removeImageButtonWrapper}>
                                    <SvgXml xml={icons.x}
                                            style={styles.removeImageButton}
                                            fill={"white"}
                                            width={15}
                                            height={15}
                                    />
                                </Pressable>}
                        <View style={styles.selectProfilePicture} >
                            {
                                profilePicturePath ? 
                                        <Image source={profilePicturePath} style={styles.image}/>
                                    :
                                    <>
                                        <Text style={styles.imageText}>
                                            Add profile picture
                                        </Text>
                                        <SvgXml xml={icons.picture} 
                                                style={styles.logo}
                                        fill={"white"}
                                        width={30}
                                        height={30}/>
                                    </>
                        }
                        </View>
                    </Pressable>
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
    logo: {
        marginLeft: "auto",
        marginRight: "auto"
    },
    logoWrapper: {
        width: "100%",
        height: Dimensions.get('window').width / 3,
        marginTop: 70
    },
    text: {
        color: "white",
        fontSize: 18,
    },
    imageText: {
        color: "white",
        fontSize: 18,
        marginLeft: "auto",
        marginRight: "auto"
    },
    gradient: {
        height: "100%",
    },
    navigation: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignContent: "space-between",
        justifyContent: "space-between",
        padding: 10
    },
    selectProfilePicture: {
        backgroundColor: "#E97C6F",
        width: 180,
        height: 180,
        borderRadius: 100,
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        overflow: "hidden"
    },
    selectProfilePictureWrapper: {
        width: 180,
        height: 180,
        borderRadius: 100,
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "blue"
    },
    image: {
        width: 180,
        height: 180
    },
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

    },
    removeImageButton: {
        
    },
    removeImageButtonWrapper: {
        position: "absolute",
        backgroundColor: "#E97C6F",
        margin: 12,
        zIndex: 2,
        borderRadius: 20,
        width: 35,
        height: 35,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: [{ scaleX: -1 }]
    }
})

export default ExtraUserDataForm;