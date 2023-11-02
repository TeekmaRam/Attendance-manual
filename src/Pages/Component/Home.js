

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
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { Homescreen } from '../../Resources/Homejson'



function Home()  {



  const RenderItem = (item) => {
    return(
      <View style={styles.CardMainContainer}>
      <TouchableOpacity style={[styles.CardContainer, {backgroundColor:item?.backgroundColor ?? "white"}]}>
        <Text>{item.description}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
   <View style={styles.HomescreenMainContainer}> 
    <View style={styles.Profile}>
      <Image source={require('../../Img/Profile.jpg')} style={styles.ProfileImage} />
      <View>
      <Text>Ratual Sarkar</Text>
      <View>
      <Text>Arth Hours-Dhara</Text>
      </View>
      </View>
    </View>
    <FlatList 
    data={Homescreen ?? []}
     keyExtractor={(item) => item.id}
     numColumns={2}
     renderItem={({item}) => RenderItem(item)}
    />
   </View>
  );
}

const styles = StyleSheet.create({

  HomescreenMainContainer: {
   backgroundColor: 'white'
  },

  Profile : {
    marginTop: 70,
   flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 80
  },

  ProfileImage : {
    height: 50,
    width: 50,
    borderRadius: 25,
  },

  CardMainContainer : {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 20,
  marginEnd: 20,
  },
  CardContainer : {
    flex: 1,
    width: 160,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    borderRadius: 8,
  }
});

export default Home;
