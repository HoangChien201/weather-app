import { Text, StyleSheet, View } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from '../../constant/colors/Color';

function ATemperatureMedium({children,color}){
    return (
        <View style={[styles.container]}>
            <Text style={styles.temperatureMedium}>{children}</Text>
            <Icon name='ellipse-outline' size={5} color={Colors.mainColor}></Icon>
        </View>
    )
}
export default ATemperatureMedium;
const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
    },
    temperatureMedium:{
        fontSize:18,
        color:Colors.mainColor
    }

})