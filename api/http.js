import axios from 'axios'

const KEY_API_WEATHER='e46e05724e504fbe9e873514230505'
export async function fetchApi(address,numberday){
    const href=`http://api.weatherapi.com/v1/forecast.json?key=${KEY_API_WEATHER}&q=${address}&days=${numberday}&aqi=no&alerts=no`
    const response=await axios.get(href)
    .then((response)=>response)
    .catch((error)=>{
        return false
    })
    return response
}

export async function postLocationWeatherApi(location){
    const response=await axios.post('https://manage-location-126bc-default-rtdb.firebaseio.com/location.json',{location:location})
    .then((response)=>{
        // console.log(response.data);
        return response
    })
    .catch((error)=>{
        return error;
    })
    return response;
}

export async function fetchApiLocation(){
    const response=await axios.get('https://manage-location-126bc-default-rtdb.firebaseio.com/location.json')
    .then((response)=>{
        return response
    })
    .catch((error)=>{
        return error;
    })
    return response;
}

export async function deleteLocationApi(id){
    const response=await axios.delete(`https://manage-location-126bc-default-rtdb.firebaseio.com/location/${id}.json`)
    .then((response)=>{
        return response
    })
    .catch((error)=>{
        return error;
    })
    return response;
}