import {ScrollView, StyleSheet} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import NavigationBar from './NavigationBar'
const Page = ({children, navigation}) => {
    return (
        <LinearGradient colors={['#DF5454', '#B83838']} style={styles.page}>
            <ScrollView style={styles.page} contentContainerStyle={{flex: 1}}>
                <NavigationBar navigation={navigation} />
                {children}
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    page: {
        height: '100%',
    }
});

export default Page;