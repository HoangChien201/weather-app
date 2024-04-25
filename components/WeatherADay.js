import {View,Text,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import ATemperatureMedium from './ui/ATemperatureMedium';
import { Colors } from '../constant/colors/Color';

function WeatherAday({date,tempMax,tempMin}){
    return (
        <View style={styles.container}>
            <Text style={styles.day}>{date}</Text>
            <Icon name='ios-cloudy' size={20} color={Colors.mainColor}/>
            <ATemperatureMedium children={tempMin}/>
            <View style={styles.line}></View>
            <ATemperatureMedium children={tempMax}/>

        </View>
    )
}

export default WeatherAday;

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-evenly',
        marginVertical:5
    },
    day:{
        fontSize:18,
        color:Colors.mainColor,
        width:80,
        textAlign:'center'
    },
    line:{
        marginTop:12,
        marginHorizontal:10,
        width:100,
        height:3,
        backgroundColor:'red',

    }
})