import {ScrollView, StyleSheet} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import NavigationBar from './NavigationBar'
const Page = ({children}) => {
    return (
        <LinearGradient colors={['#DF5454', '#B83838']}>
            <NavigationBar/>
            <ScrollView style={styles.page}>
                {children}
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    page: {
        height: '100%',
        width: '100%',
    }
});

export default Page;