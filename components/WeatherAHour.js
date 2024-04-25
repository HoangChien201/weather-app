import {View,Text,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import ATemperatureMedium from './ui/ATemperatureMedium';
import { Colors } from '../constant/colors/Color';


function TemperatureAHour({hour,tempC}){
    function IconOfHour(){
        if((5<hour)&&(hour<18)){
            return <Icon name='sunny' size={20} color='yellow'/>
        }
        else{
            return <Icon name='ios-cloudy' size={20} color='#fff'/>
        }
    }
    return( 
        <View style={styles.container}>
            <Text style={styles.hour}>{hour<10?`0${hour}`:hour}</Text>
            <IconOfHour/>
            <View>
                <ATemperatureMedium children={tempC}/>
            </View>
        </View>

    )
}
export default TemperatureAHour;

const styles=StyleSheet.create({
    container:{
        flexDirection:'column',
        marginHorizontal:23,
    },
    hour:{
        fontSize:18,
        color:Colors.mainColor
    }
})