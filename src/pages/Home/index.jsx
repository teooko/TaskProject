import {Button, Text, View} from "react-native";
import Page from "../Page";
import React from "react";
import {StyleSheet} from "react-native";
import LinearGradient from "react-native-linear-gradient";

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Page navigation={navigation}>
                <View style={styles.container}>
                    <View style={styles.calendar}>
                        <Text style={styles.monthYear}>
                            December 2023
                        </Text>
                    </View>
                    <LinearGradient colors={['#E97C6F', '#FFC165']} style={styles.todayActivities}>
                        <Text style={styles.todayLabel}>
                            Today's Activity
                        </Text>
                    </LinearGradient>
                </View>
            </Page>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        flexGrow: 1
    },
    calendar: {
        width: '100%',
        height: 140,
    },
    todayActivities: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
    },
    todayLabel: {
        fontSize: 20,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10
    },
    monthYear: {
        paddingLeft: 10
    }
})
export default Home