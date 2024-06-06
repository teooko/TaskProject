import {StyleSheet, View, Text} from 'react-native';
import {icons} from '../../assets/Icons';
import * as React from 'react';
import NavigationButton from '../../components/NavigationButton';
import {useContext} from "react";
import {RightDrawerContext} from "./RightDrawer";
import {useSelector} from "react-redux";
const NavigationBar = ({navigation}) => {
    const {menu, profile, speechBubble} = icons;
    const {userIds, newMessagesIndicator} = useSelector(state => state.webSocket);
    return (
        <RightDrawerContext.Consumer>
            {({ openRightDrawer }) => (
                <View style={styles.navigationBar}>
                    <NavigationButton
                        icon={menu}
                        onPress={() => navigation.openDrawer()}
                        size={20}
                    />
                    <View style={styles.navigationButtons}>
                        {/*newMessagesIndicator ? <Text>AI MESAJE</Text> : null*/}
                        {userIds.length !== 0 ? <NavigationButton
                            icon={speechBubble}
                            onPress={() => navigation.navigate("ChatRoom")}
                            size={20}
                        /> : null}
                    <NavigationButton
                        icon={profile}
                        onPress={openRightDrawer} 
                        size={20}
                    />
                    </View>
                </View>
            )}
        </RightDrawerContext.Consumer>
    );
};

const styles = StyleSheet.create({
    navigationBar: {
        height: 40,
        width: '100%',

        paddingLeft: 10,
        paddingRight: 10,

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    navigationButtons: {
        display: "flex",
        flexDirection: "row",
        gap: 20
    }
});

export default NavigationBar;
