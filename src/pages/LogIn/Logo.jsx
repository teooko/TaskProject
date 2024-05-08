import React from 'react';
import {Dimensions, StyleSheet, View} from "react-native";
import {SvgXml} from "react-native-svg";
import {icons} from "../../assets/Icons";

const Logo = () => {
    return (
        <View style={styles.logoWrapper}>
            <SvgXml
                xml={icons.logo}
                width={"90%"}
                height={Dimensions.get('window').width / 3}
                style={styles.logo}
            />
        </View>
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
    }
})
export default Logo;