import { Text, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import ATemperatureMedium from '../components/ui/ATemperatureMedium'
import { Colors } from '../constant/colors/Color';


function WeatherTemperature({address,tempC,tempL,tempH}){
    return (
        <View>
            <Text style={styles.address}>{address}</Text>
            <View style={styles.temperatureContainer}>
                <View style={[styles.temperatureMainContainer,styles.flexRow]}>
                    <Text style={styles.temperatureMain}>{tempC}</Text>
                    <Icon name='ellipse-outline' size={12} color={Colors.mainColor}></Icon>
                </View>
                <Text style={styles.status}>Trời nhiều mây</Text>
                <View style={styles.temperatureMediumContainer}>
                    <ATemperatureMedium children={`C:${tempH}`}/>
                    <ATemperatureMedium children={`T:${tempL}`}/>
                </View>
            </View>
        </View>
    )
}

export default WeatherTemperature;
const styles = StyleSheet.create({
    flexRow:{
        flexDirection:'row'
    },
    address:{
        textAlign:'center',
        fontSize:35,
        fontWeight:'bold',
        color:Colors.mainColor
    },
    status:{
        fontSize:18,
        color:Colors.mainColor
    },
    temperatureContainer:{
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center'
    },
    temperatureMediumContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:100,
        marginVertical:5
    },
    temperatureMain:{
        fontSize:50,
        color:Colors.mainColor
    },
  
})