import {ScrollView, StyleSheet} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import NavigationBar from './NavigationBar'
const Page = ({children}) => {
    return (
        <LinearGradient colors={['#DF5454', '#B83838']}>
            <ScrollView style={styles.page}>
                <NavigationBar/>
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