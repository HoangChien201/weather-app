import {useEffect,useLayoutEffect,useState} from 'react'
import {Text,View,TextInput,StyleSheet,Alert,FlatList} from 'react-native'
import { useIsFocused } from '@react-navigation/native';

import WeatherItem from '../components/WeatherItem';
import IconButton from '../components/ui/IconButton';
import { Colors } from '../constant/colors/Color';
import { deleteLocationApi, fetchApi, fetchApiLocation, postLocationWeatherApi, storeExpense } from '../api/http';

function HomeWeather({navigation}){
    const [addressSearch,setAddressSearch]=useState('')
    const [listWeather,setListWeather]=useState([])
    const [buttonOptionStatus,setButtonOptionStatus]=useState(false)
   const isFocused=useIsFocused()
    useEffect(()=>{

        async function GetLocationApi(){
            const response= await fetchApiLocation()
            if(response){
                console.log('rsp'+response);
                let list=[]
                const data=response.data
                console.log(data);
                for(const id in data){
                    list=[...list,{
                        id:id,
                        location:data[id].location
                    }]
                }
                console.log(true);
                setListWeather([...list])
            }
            
        }
        GetLocationApi()
    },[isFocused])
    console.log(listWeather);

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=><IconButton icon='ellipsis-horizontal-circle' size={30} color='#fff' onPress={buttonOptionHandle}/>
        })
    },[navigation])
        

    function WeatherItemHandle(location){
        navigation.navigate('WeatherDetail',{
            location:location,
    
        })
    }

    function AddWeatherHandle(location,addWeather){
        navigation.navigate('WeatherDetail',{
            location:location,
            addWeather:addWeather
        })
    }

    function buttonSearchHandle(){
        // gọi api từ value input
        async function PostLocationApi(){
            const response= await fetchApi(addressSearch,'1')
            if(!response){
                Alert.alert('Tên vị trí không hợp lệ!', 'Vui lòng kiểm tra lại',[
                    {
                        text:'OK',
                        style:'cancle'
                    }
                ])
            }
            else{
                const locationSearch=response.data.location.name;
                const checkLocationExisted=listWeather.find((item)=>item.location==locationSearch);
                if(checkLocationExisted){
                    AddWeatherHandle(locationSearch)
                }
                else{
                    AddWeatherHandle(locationSearch,true)

                }
            }
        }
        PostLocationApi()
        
    }

    function AddressSearchChange(address){
        setAddressSearch(address)
    }

    function buttonOptionHandle(){
        if(buttonOptionStatus){
            setButtonOptionStatus(false)
        }
        else if(!buttonOptionStatus){
            setButtonOptionStatus(true)

        }
    }

    function removeWeatherItem(id){
        const list=listWeather.filter((item)=>item.id!==id)
        setListWeather(list)
        const respone=deleteLocationApi(id)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thời tiết</Text>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input} 
                    placeholder='Tìm tên thành phố/sân bay'
                    placeholderTextColor='#fff'
                    value={addressSearch}
                    onChangeText={AddressSearchChange}/>
                    
                <View style={styles.button}>
                    <IconButton icon='search' size={24} color={Colors.mainColor} onPress={buttonSearchHandle}/>
                </View>
            </View>
            <View style={styles.listWeatherItemContainer}>
                {listWeather.length<1 && <Text style={styles.notificationtListWeather}>Chưa có danh sách thời tiết</Text>}
                <FlatList
                    style={styles.listWeatherItem} 
                    data={listWeather}
                    keyExtractor={({id})=>id}
                    renderItem={({item})=>{
                        return(
                            <View style={styles.weatherItemContainer}>
                                {
                                    buttonOptionStatus 
                                    && <View style={styles.buttonRemove}>
                                            <IconButton icon='remove' size={24} color='red' onPress={removeWeatherItem.bind(this,item.id)}/>
                                        </View>
                                }
                                
                                <WeatherItem onPress={WeatherItemHandle} address={item.location}/>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

export default HomeWeather;
const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:15,
        backgroundColor:'#111'
    },
    title:{
        fontSize:35,
        color:'#fff',
        fontWeight:"bold",
        marginBottom:10
    },
    inputContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    input:{
        flex:9,
        borderWidth:1,
        padding:5,
        backgroundColor:'#4543435c',
        color:'#fff',
        paddingHorizontal:20,
    },
    button:{
        flex:1,
        marginHorizontal:5
    },
    alert:{
        flex:1,
        justifyContent:'center',
        alignItems:"center",
        borderRadius:5
    },
    listWeatherItemContainer:{
        flex:1,
        marginTop:10,
        // backgroundColor:'red'
    },
    notificationtListWeather:{
        textAlign:'center',
        color:Colors.mainColor
    },
    listWeatherItem:{
        flex:1,
        width:'100%'
    },
    weatherItemContainer:{
        flexDirection:"row",
        alignItems:'center'
    },
    buttonRemove:{
        marginHorizontal:10
    }
})