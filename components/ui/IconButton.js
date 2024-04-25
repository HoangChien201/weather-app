import {Pressable,StyleSheet} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

function IconButton({icon,size,color,onPress}){
    return(
        <Pressable onPress={onPress} style={({pressed})=>pressed ? styles.pressed : null}>
            <Ionicons name={icon} size={size} color={color}></Ionicons>
        </Pressable>
    )
}
export default IconButton;

const styles=StyleSheet.create({
    pressed:{
        opacity:0.7
    }
})