

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Homenav from './src/Pages/HomeNav'



function App(): JSX.Element {


  return (
    <NavigationContainer>
      <Homenav />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
