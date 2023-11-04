import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { Homescreen } from '../../Resources/Homejson'
import Icon from 'react-native-vector-icons/AntDesign';
import Bell from 'react-native-vector-icons/Fontisto'

Icon.loadFont();



const Navigation = (id, props) => {
  switch(id) {
    case 1:
      return console.log("Calender");
    case 2:
      return props.navigation.navigate('Attendance');
    case 3:
      return console.log("General Insights");
    case 4:
      return console.log("Announcements");
    case 5:
      return console.log("Message");
    case 6:
      return console.log("Entry/Dispersal");
  }
}




const RenderItem = ({ props, item }) => {
  return (
    <View style={styles.CardMainContainer}>
      <TouchableOpacity onPress={() => Navigation(item.id, props)} style={[styles.CardContainer, { backgroundColor: item?.backgroundColor ?? "white" }]}>
        <Image key={item.id} source={item.ImagePath} style={styles.CardImages} />
        <Text>{item.description}</Text>
      </TouchableOpacity>
    </View>
  );
}

function Home(props)  {
  return (
   <View style={styles.HomescreenMainContainer}> 
    <View style={styles.Profile}>
      <Image source={require('../../Img/Profile.jpg')} style={styles.ProfileImage} />
      <View style={styles.ProfileHeadlineContainer}>
      <Text style={styles.UsernameTextstyle}>Ratual Sarkar</Text>
       <View style={styles.DropdownIcon}>
      <Text style={styles.DropdownTextstyle}>Arth Hours-Dhara</Text>
      <Icon name="down" size={16} color={"#7869E6"} top={2}  marginLeft={6}/>
      </View>
      </View>
      <View style={styles.BellConatiner}> 
      <View style={styles.BellBackgeound}> 
        <Bell name='bell' size={16} color='#7869E6' />
        </View>
      </View>
    </View>
    <FlatList 
    data={Homescreen ?? []}
    keyExtractor={(item) => item.id}
    numColumns={2}
     renderItem={({item}) => <RenderItem props={props} item={item} />}
/>
   </View>
  );
}

const styles = StyleSheet.create({

  HomescreenMainContainer: {
    flex: 1,
   backgroundColor: 'white'
  },

  Profile : {
    marginTop: 70,
   flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 32
  },

  ProfileImage : {
    height: 48,
    width: 48,
    borderRadius: 25,
  },

  ProfileHeadlineContainer : {
   marginLeft: 10,
   marginTop: 1
  },

  UsernameTextstyle : {
    color: "#010101",
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 25.14,
  },

  DropdownIcon : {
   flexDirection: 'row',
   marginTop: 1
  },

  DropdownTextstyle : {
 color: "#7869E6",
 fontSize: 14,
 fontWeight: '600',
 lineHeight: 17.6,
  },

  BellConatiner : {
    flex: 1,
    alignItems: 'flex-end',
    marginTop: 9,
    marginEnd: 20,

  },

  BellBackgeound : {
    height: 30,
    width: 30,
    backgroundColor: '#7869E61A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
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
    marginVertical: 8,
    borderRadius: 8,

  },

  CardImages : {
    height: 48,
    width: 35,
   

  }
});

export default Home;
