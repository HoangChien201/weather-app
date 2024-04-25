import { StyleSheet, View, Text } from 'react-native'
import * as Progress from 'react-native-progress'
import Icon from 'react-native-vector-icons/Ionicons'

import ATemperatureMedium from './ui/ATemperatureMedium'


function Temperature({TLow,THigh,TCurrent}) {
    const progress=(TCurrent-TLow)*(100 / (THigh-TLow)/100)
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Icon name='thermometer-outline' size={20} color='#111' />
                <Text style={styles.title}>Nhiệt độ</Text>
            </View>
            <View style={styles.temperatureContainer}>
                <ATemperatureMedium children={TLow}/>
                <Progress.Bar 
                progress={progress ? progress :0} 
                width={200}
                color='red'
                />
                <ATemperatureMedium children={THigh}/>
            </View>
        </View>
    )
}
export default Temperature;
const styles = StyleSheet.create({
    container:{
        width:'100%',
        minHeight:100,
        backgroundColor:'rgba(52, 52, 52, 0.3)',
        marginVertical:10,
        padding:10,
        borderRadius:5
    },
    titleContainer:{
        flexDirection:'row',
        opacity:0.7

    },
    title:{
        fontSize:16,
        textTransform:'uppercase',
        fontWeight:'bold'
    },
    temperatureContainer:{
        flex:1,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-evenly'
    }
})
