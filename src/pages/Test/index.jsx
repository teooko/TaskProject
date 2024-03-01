import Page from "../Page";
import { ScrollView } from 'react-native-gesture-handler';
import {Modal} from "react-native";
import ColorPicker, {HueSlider, OpacitySlider, Panel1, Preview, Swatches} from "reanimated-color-picker";
const Test = ({navigation}) => {
    const onSelectColor = ({ hex }) => {
        // do something with the selected color.
        console.log(hex);
    };
    return(
        <Page navigation={navigation}>
            <ScrollView>
                    <ColorPicker style={{ width: '70%', height: 100 }} value='red' onChange={onSelectColor}>
                        <HueSlider style={{ backgroundColor: "white", borderWidth: 3 }}/>
                    </ColorPicker>
            </ScrollView>
        </Page>
    )
}

export default Test;