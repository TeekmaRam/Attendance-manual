

import * as React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Component/Home'
import Attendance from './Component/Attendance/Attendance'

const Stack = createNativeStackNavigator();

function Homenav()  {

//uuuuuuuu
  return (
   <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Attendance" component={Attendance} />
   </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  
});

export default Homenav;
