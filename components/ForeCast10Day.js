import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'

import WeatherAday from './WeatherADay';

import { formatDate } from '../util/time';

function ForeCast10Day({ forecast }) {

    const forecastdays = forecast.forecastday
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Icon name='calendar-sharp' size={20} color='#000' />
                <Text style={styles.title}>Dự Báo 10 Ngày</Text>
            </View>
            <View>
                {
                    forecastdays ? 
                    forecastdays.map((forecastday,index) => {
                        const date = formatDate(forecastday.date);
                        const tempMax = forecastday.day['maxtemp_c'].toFixed(0);
                        const tempMin = forecastday.day['mintemp_c'].toFixed(0);
                        if(index===0){
                            return <WeatherAday date={'Hôm nay'} tempMax={tempMax} tempMin={tempMin}/> 
                        }
                        return <WeatherAday date={date} tempMax={tempMax} tempMin={tempMin}/>
                    })
                    
                    :<Text>Đang load</Text>
                }
            </View>
        </View>
    )
}

export default ForeCast10Day;
const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 150,
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        marginVertical: 10,
        padding: 10,
        borderRadius: 5
    },
    titleContainer: {
        flexDirection: 'row',
        opacity: 0.7

    },
    title: {
        marginStart: 5,
        fontSize: 16,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
})