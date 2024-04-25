/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {StyleSheet,Text,View,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IconButton from './components/ui/IconButton';


import HomeWeather from './screens/HomeWeather'
import WeatherDetail from './screens/WeatherDetail';
const Stack=createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      >
        <Stack.Screen 
          name='HomeWeather' 
          component={HomeWeather}
          options={
            {
              headerStyle:{backgroundColor:'#111'},
              headerTitle:''
            }
          }
        ></Stack.Screen>
        <Stack.Screen
          name='WeatherDetail'
          component={WeatherDetail}
          options={{
          }
          }
        >

        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  }
});

export default App;
