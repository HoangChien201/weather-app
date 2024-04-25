import {View,StyleSheet, Text} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { Colors } from '../constant/colors/Color';

function DisplayParticleWeather({icon,title,content,spotlight}){
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Icon name={icon} size={20}/>
                <Text style={styles.title}>{title}</Text>
            </View>
            <Text style={styles.content}>{content}</Text>
            <Text style={styles.spotlight}>{spotlight}</Text>
        </View>
    )
}
export default DisplayParticleWeather;
const styles=StyleSheet.create({
    container:{
        width:185,
        height:120,
        backgroundColor:'rgba(52, 52, 52, 0.3)',
        marginVertical:10,
        padding:10,
        borderRadius:5,
        justifyContent:'center'
    },
    titleContainer:{
        flexDirection:'row',
        opacity:0.7,
        alignItems:'center'

    },
    title:{
        fontSize:13,
        textTransform:'uppercase',
        fontWeight:'bold',
        marginStart:10
    },
    content:{
        fontSize:30,
        color:Colors.mainColor,
        marginVertical:5
    },
    spotlight:{

    }
})