import {View,StyleSheet,Text,FlatList} from 'react-native'

import WeatherAHour from './WeatherAHour';
function ForeCastADay({forecast}){

    const DATA_HOUR=forecast ? forecast.forecastday[0].hour : null

    function renderHandle({item}){
        const hour=new Date(item.time).getHours()
        const tempC=item['temp_c'].toFixed(0);
        return <WeatherAHour hour={hour} tempC={tempC}/>
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dự báo có mây vào khoảng 07:00</Text>
            <FlatList 
                data={DATA_HOUR}
                keyExtractor={({time})=>time}
                renderItem={renderHandle}
                horizontal={true}
                style={styles.weatherAHourContainer}>
            </FlatList>
        </View>
    )
}
export default ForeCastADay;
const styles=StyleSheet.create({
    container:{
        width:'100%',
        maxHeight:150,
        backgroundColor:'rgba(52, 52, 52, 0.3)',
        marginTop:30,
        padding:10,
        borderRadius:5
    },
    title:{
        fontSize:15,
        color:'#fff',
        marginBottom:10
    },
    weatherAHourContainer:{
    }
})