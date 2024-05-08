import React from 'react';
import { View, Text, Button } from 'react-native';
import { Formik } from 'formik';
import ImagePicker from 'react-native-image-picker';

const ImageForm = () => {
    // Define your Formik initialValues and handleSubmit function
    const initialValues = {
        image: null, // This will hold the selected image file
        description: '', // Add any other form fields you need
    };

    const handleSubmit = (values, { setSubmitting }) => {
        // Handle form submission here
        console.log('Form submitted:', values);
        setSubmitting(false);
    };

    return (
        <View>
            <Text>Image Form</Text>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <View>
                        <Button
                            title="Select Image"
                            onPress={() => {
                                ImagePicker.showImagePicker(
                                    {
                                        title: 'Select Image',
                                        storageOptions: {
                                            skipBackup: true,
                                            path: 'images',
                                        },
                                    },
                                    (response) => {
                                        if (response.didCancel) {
                                            console.log('User cancelled image picker');
                                        } else if (response.error) {
                                            console.log('ImagePicker Error: ', response.error);
                                        } else {
                                            // Set the selected image file to Formik state
                                            setFieldValue("image", {
                                                uri: response.uri,
                                                name: response.fileName,
                                                type: response.type,
                                            });
                                        }
                                    }
                                );
                            }}
                        />
                        <Button
                            title="Submit"
                            onPress={() => handleSubmit}
                            disabled={isSubmitting}
                        />
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default ImageForm;
