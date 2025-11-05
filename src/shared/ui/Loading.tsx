import {Dimensions, View} from "react-native";
import * as Progress from 'react-native-progress';
import {AppTheme} from "../AppTheme";



const {width, height} = Dimensions.get('window');

export const Loading = () => {
    return (
        <View
            style={{
                height: height,
                width: width,
                position:'absolute',
                alignItems:'center',
                justifyContent:'center',
            }}
        >
            <Progress.CircleSnail thickness={12} size={160} color={AppTheme.secondary}/>
        </View>
    )
}
