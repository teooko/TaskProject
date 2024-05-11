import React, {useEffect, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, View, Image, Text} from "react-native";
import {setProfilePicturePath} from "../../store/accountSlice";
import {SvgXml} from "react-native-svg";
import {icons} from "../../assets/Icons";
import {useDispatch, useSelector} from "react-redux";
import {launchImageLibrary} from "react-native-image-picker";
const SelectProfilePicture = ({isSubmitting, setFieldValue}) => {
    const dispatch = useDispatch();
    const {profilePicturePath} = useSelector(state => state.account);
    const selectImage = async() => {
        const options = {
            maxWidth: 200,
            maxHeight: 200,
            quality: 0.3,
            includeBase64: true
        }
        await launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = response;
                setFieldValue("profilePicturePath", source.assets[0].uri);
                setFieldValue("profilePictureBase64", source.assets[0].base64);
                dispatch(setProfilePicturePath(source.assets[0].uri));
                console.log(source.assets[0]);
            }
        });
    };
    
    return (
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
                        <Image source={{uri: profilePicturePath}} style={styles.image}/>
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
    );
};

const styles = StyleSheet.create({
    logo: {
        marginLeft: "auto",
        marginRight: "auto"
    },
    imageText: {
        color: "white",
        fontSize: 18,
        marginLeft: "auto",
        marginRight: "auto"
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
export default SelectProfilePicture;