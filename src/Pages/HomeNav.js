

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Component/Home'


const Stack = createNativeStackNavigator();

function Homenav()  {


  return (
   <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
   </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  
});

export default Homenav;
