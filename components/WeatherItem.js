import { useState,useLayoutEffect } from 'react';
import {Pressable,Text,View,StyleSheet,ImageBackground,ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { fetchApi } from '../api/http';
import { formatHour } from '../util/time';
import IconButton from './ui/IconButton';

function WeatherItem({onPress,address}){
    const [dataApi,setDataApi]=useState();
    useLayoutEffect(()=>{
        async function FetchApi(){
            const response= await fetchApi(address,'1')
            setDataApi({
                location:response.data.location,
                current:response.data.current,
                forecast:response.data.forecast
            })
        }
        FetchApi()
        
    },[])
    if(!dataApi){
        return (
            <View style={styles.loading}>
                <ActivityIndicator color='#ccc' size={60}/>
            </View>
        )
    }
    let dataItem={
        hour:'',
        address:'',
        tempC:'',
        tempLow:'',
        tempHigh:'',
    }
    
    let timeSlot;

    if(dataApi.forecast){
        dataItem={
            hour:formatHour(dataApi.location.localtime),
            address:dataApi.location.name,
            tempC:dataApi.current.temp_c,
            tempLow:dataApi.forecast.forecastday[0].day['mintemp_c'].toFixed(0),
            tempHigh:dataApi.forecast.forecastday[0].day['maxtemp_c'].toFixed(0),
        }
        const hour=new Date(dataApi.location.localtime).getHours();
        timeSlot=0<hour<13 ? 'am' :'pm'
        
    }

    
    return (
        <View style={styles.weatherItemContainer}>
            
            <Pressable style={({pressed})=>pressed ? styles.pressed: null} onPress={onPress.bind(this,address)}>

                    <ImageBackground
                        source={timeSlot==='am' ? require('../assets/images/sky_day.jpg') : require('../assets/images/sky_night.webp')}
                        style={styles.background}
                        resizeMode='cover'
                        >
                        <View style={styles.containerContent}>
                            <View style={styles.inforContainer}>
                                <View style={styles.location}>
                                    <Text style={styles.address}>{dataItem.address}</Text>
                                    <Text style={styles.time}>{dataItem.hour}</Text>
                                </View>
                                <Text style={styles.status}>Trời nhiều mây</Text>
                            </View>
                            <View style={styles.temperatureContainer}>
                                <View style={styles.temperatureMainContainer}>
                                    <Text style={styles.temperatureMain}>{dataItem.tempC.toFixed(0)}</Text>
                                    <Ionicons name='ellipse-outline' size={12} color='#000'></Ionicons>
                                </View>
                                <View style={styles.temperatureMedium}>
                                    <View style={styles.temperatureHighContainer}>
                                        <Text style={styles.temperatureHigh}>C:{dataItem.tempHigh}</Text>
                                        <Ionicons name='ellipse-outline' size={6} color='#000'></Ionicons>
                                    </View>
                                    <View style={styles.temperatureLowContainer}>
                                        <Text style={styles.temperatureLow}>T:{dataItem.tempLow}</Text>
                                        <Ionicons name='ellipse-outline' size={6} color='#000'></Ionicons>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>

            </Pressable>
        </View>
    )
}

export default WeatherItem;
const styles=StyleSheet.create({
    weatherItemContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    buttonRemove:{
        marginHorizontal:10,
    },
    pressed:{
        opacity:0.6
    },
    background:{
        marginVertical:10,
    },
    containerContent:{
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
        height:110,
        flex:1,
        width:385
    },
    inforContainer:{
        flexDirection:"column",
    },
    location:{

    },
    address:{
        fontSize:27
    },
    time:{
        fontSize:15
    },
    temperatureContainer:{
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
    },
    temperatureMedium:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:80
    },
    temperatureMainContainer:{
        flexDirection:'row',
    },
    temperatureMain:{
        fontSize:50,
    },
    temperatureHighContainer:{
        flexDirection:'row'
    },
    temperatureLowContainer:{
        flexDirection:'row'
    },
    loading:{
        flex:1,
        justifyContent:'center',
        alignItems:"center"
    }
})