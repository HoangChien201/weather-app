import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    ScrollView,
    ActivityIndicator} from 'react-native'
import { useState,useLayoutEffect } from 'react';


import Temperature from '../components/Temperature'
import ForeCastADay from '../components/ForeCastADay'
import ForeCast10Day from '../components/ForeCast10Day'
import WeatherTemperature from '../components/WeatherTemperature'
import DisplayParticleWeather from '../components/DisplayParticleWeather'

import { fetchApi, postLocationWeatherApi } from '../api/http';
import IconButton from '../components/ui/IconButton';

function WeatherDetail({route,navigation}){
    const location=route.params.location
    const addWeather=route.params.addWeather
    if(addWeather){
        function buttonAddWeatherHandle(){
            postLocationWeatherApi(location)
            navigation.goBack()
        }

        useLayoutEffect(()=>{
            navigation.setOptions({
                headerRight:()=><IconButton icon='add' size={30} color='#000' onPress={buttonAddWeatherHandle}/>
            })
        },[navigation])
        
    }
    const [dataApi,setDataApi]=useState();
    useLayoutEffect(()=>{
        async function FetchApi(){
            const response= await fetchApi(location,'10')
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
    let dataWeatherTemperature={
        address:'',
        tempC:'',
    }
    let timeSlot;

    if(dataApi.forecast){
        dataWeatherTemperature={
            address:dataApi.location.name,
            tempC:dataApi.current.temp_c,
        }
        const hour=new Date(dataApi.location.localtime).getHours();
        timeSlot=0<hour<13 ? 'am' :'pm'
        
    }
    if(dataApi.forecast){
        var tempLow=dataApi.forecast.forecastday[0].day['mintemp_c'].toFixed(0);
        var tempHigh=dataApi.forecast.forecastday[0].day['maxtemp_c'].toFixed(0);
        var precip=dataApi.forecast.forecastday[0].day['totalprecip_mm']
        var uv =dataApi.forecast.forecastday[0].hour[0].uv;
        var wind=dataApi.forecast.forecastday[0].hour[0]['wind_mph'];
        var humidity=dataApi.forecast.forecastday[0].hour[0]['humidity'];
        var vis=dataApi.forecast.forecastday[0].hour[0]['vis_km']
        var sunrise=dataApi.forecast.forecastday[0].astro.sunrise
        var sunset=dataApi.forecast.forecastday[0].astro.sunset

    }
    
    return (
        <ImageBackground
            source={timeSlot==='am' ? require('../assets/images/sky_day.jpg') : require('../assets/images/sky_night.webp')}
            style={styles.background}
            resizeMode='cover'>
            <ScrollView style={styles.container}>
                <WeatherTemperature address={dataWeatherTemperature.address} tempC={dataWeatherTemperature.tempC} tempH={tempHigh} tempL={tempLow}/>
                <ForeCastADay forecast={dataApi.forecast}/>
                <ForeCast10Day forecast={dataApi.forecast}/>
                <Temperature TLow={tempLow} THigh={tempHigh} TCurrent={dataWeatherTemperature.tempC}/>
                <View style={styles.flexRow}>
                    <DisplayParticleWeather icon='sun' title='Chỉ số UV' content={uv} spotlight='Thấp đến hết ngày'/>
                    <DisplayParticleWeather icon='sunset' title='Mặt trời lặn' content={sunset} spotlight={'MT mọc: '+sunrise}/>
                </View>
                <View style={styles.flexRow}>
                    <DisplayParticleWeather icon='wind' title='Gió' content={`${wind} km/h`} spotlight=''/>
                    <DisplayParticleWeather icon='cloud-rain' title='Lượng mưa' content={`${precip}mm`} spotlight=''/>
                </View>
                <View style={styles.flexRow}>
                    <DisplayParticleWeather icon='droplet' title='Độ ẩm' content={`${humidity}%`} spotlight=''/>
                    <DisplayParticleWeather icon='eye' title='Tầm nhìn' content={`${vis} km`} spotlight='Sương mù nhẹ làm giảm tầm nhìn'/>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default WeatherDetail;

const styles=StyleSheet.create({
    background:{
        flex:1,
        padding:15,
        backgroundColor:'#111'
    },
    flexRow:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    loading:{
        flex:1,
        justifyContent:'center',
        alignItems:"center"
    }
})