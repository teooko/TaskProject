import {ScrollView, StyleSheet} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import NavigationBar from './NavigationBar'
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Page = ({children, navigation}) => {
    return (
        <LinearGradient colors={['#DF5454', '#B83838']}>
            <ScrollView style={styles.page}>
                <NavigationBar navigation={navigation}/>
                {children}
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    page: {
        height: '100%',
        marginLeft: 10,
        marginRight: 10,
    }
});

export default Page;