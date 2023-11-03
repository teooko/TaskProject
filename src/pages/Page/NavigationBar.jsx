import {StyleSheet, Text, View} from "react-native";

const NavigationBar = () => {
    return (
        <View style={styles.navigationBar}>
            <Text>
                Hello from Nav Bar
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navigationBar: {
        height: 40,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    }
});

export default NavigationBar;
