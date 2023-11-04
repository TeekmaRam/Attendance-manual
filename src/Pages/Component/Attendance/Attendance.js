import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { studentlistData } from '../../../Resources/StudentList'
import Icon from 'react-native-vector-icons/AntDesign';
import CalendarPicker from 'react-native-calendar-picker';

Icon.loadFont();



const Attendanceoptions = ({attendance, attendanceStatus, backgrounColor, onPress}) => {
  return(
    <View style={{flexDirection: 'row'}}>
    <TouchableOpacity onPress={onPress}
    style={[styles.SelectedAttendance, {backgroundColor: attendanceStatus ? backgrounColor : 'white',} ]}
      >
      <Text style={styles.TextStyle}>
     {attendance}
          </Text>
     </TouchableOpacity>
     </View>
  )
}

function RenderItem({item, updateAttendence}) {
  let [attendance, setAttendance] = React.useState(item?.attendance)
  let [selectedAttendance, setSelectedAttendance] = React.useState([])
  let [attendanceOptionShow, SetattendanceOptionShow] = React.useState(false)

  React.useEffect(()=>{
    let att = item?.attendance;
     setAttendance(item?.attendance);
    let filterDta = att.filter(item=>item.attendanceStatus)
    if(filterDta.length > 0){
  
      setSelectedAttendance(filterDta)
      SetattendanceOptionShow(true)
    }
  }, [item?.attendance])
  return(
    <View key={item.id} style={styles.AttendanceListContainer}>
    <Image source={require('../../../Img/Profile.jpg')} style={styles.ProfileImage} />
    <View style={styles.UsernameStyle}>
    <Text style={styles.Firstnamestyle}>{item?.FirstName ?? ""}</Text>
    <Text style={styles.Lastnamestyle}>{item?.LastName ?? ""}</Text>
    </View>
    <View>
    {!attendanceOptionShow && <View  style={styles.AttendanceoptionListConatiner}>
      {attendance.map(newitem=>{
        return <Attendanceoptions onPress={()=>{
          updateAttendence(item.id, newitem.id);
          
        }} {...newitem} />
      })}
    </View>}

    { attendanceOptionShow &&  <View  style={styles.AttendanceoptionListConatinerhide}>
      {selectedAttendance.map(newitem=>{
        return <Attendanceoptions onPress={()=>{
          updateAttendence(item.id, newitem.id);
          
        }} {...newitem} />
      })}
    </View>}
    </View>

    {selectedAttendance.length > 0 && attendanceOptionShow && <TouchableOpacity onPress={() => SetattendanceOptionShow(false)}>
         <Image source={require('../../../Img/pen.jpg')} style={styles.EditButton} />
        </TouchableOpacity>}
    <Image source={require('../../../Img/Notification.jpg')} style={styles.Notification} />
    </View>
  )
}

function Attendance(props)  {
const [selectedAttendance, setSelectedAttendance] = React.useState([])
const [StudentList, setStudentList] = React.useState(studentlistData);
const [showData , setShowData] = React.useState(false)
const [selectData , setSelectData] = React.useState("2023-11-21")


React.useEffect(() => {
  let staudent = studentlistData.map(item=>({
    ...item,
    attendance:item.attendance.map(newItem=>({...newItem, "attendanceStatus":false}))
  }))
   setSelectedAttendance(staudent)
 
},[studentlistData])


let updateAttendence = (userId, attendanceId)=>{
  let staudent = selectedAttendance.map(item=>{
    if(item.id == userId){
      return ({...item,
        attendance:item.attendance.map(newItem=>{
          if(newItem.id == attendanceId){
            return ({...newItem, "attendanceStatus":true})
          } else {
            return ({...newItem, "attendanceStatus":false})
          }
          }
          )})
    } else {
      return item
    }
    
  })
   setSelectedAttendance(staudent)
 
}

const onDateChange = (data) => {
const dateObject = new Date(data);
const formattedDate = dateObject.toISOString().split('T')[0];
setSelectData(formattedDate)
setShowData(false)
}

 return (
  <View style={styles.AttentdancescreenMainContainer}>
  <View style={styles.AttendanceScreenHeader}>
    <View style={styles.ProfileHeadlineContainer}>
      <View style={styles.NameAndClanderContainer}>
        <View style={styles.NameStyle}>
          <Text style={styles.NameTextstyle}>Arth Hours-Dhara</Text>
          <Icon name="down" size={16} color="#7869E6" top={4} marginLeft={6} />
        </View>
        <TouchableOpacity onPress={() => setShowData(!showData)} style={styles.calenderButton}>
          <View style={styles.iconContainer}>
            <Icon name="left" color="#FFFFFF" size={7} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.dataText}>{selectData?.toString() ?? "NA"}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon name="right" color="#FFFFFF" size={7} />
          </View>
        </TouchableOpacity>
        <View style={styles.calenderContainer}>
          {showData ? (
            <CalendarPicker
              width={400}
              selectedDayTextColor="#FFFFFF"
              onDateChange={onDateChange}
            />
          ) : null}
        </View>
      </View>
    </View>
    <View style={styles.dailyAttendanceContainer}>
      <Text style={styles.dailyAttedanceTeaxtstyle}>Daily Attendance</Text>
      <Icon name="down" size={16} color="#FFFFFF" marginLeft={4} />
    </View>
  </View>
  <View style={styles.line} />
  <View style={styles.Totalstudent}>
  <Text style={styles.AllStudentsText}>All Students({selectedAttendance.length})</Text>
  <View style={styles.MarkallpresentContainer}>
  <Text style={styles.MarkallpresentText}>Mark all present</Text>
  <Icon name='checkcircleo' size={20} color='#7869E6' left={4}/>
  </View>
  </View>
  <FlatList 
    data={selectedAttendance ?? []}
     keyExtractor={(item) => item.id}
     renderItem={(item)=><RenderItem updateAttendence={updateAttendence} {...item} />}
    />
</View>
  ); 
}

const styles = StyleSheet.create({

  AttentdancescreenMainContainer : {
    flex: 1,
    backgroundColor: 'white',
  },

  AttendanceScreenHeader : {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 0
  },

  NameStyle : {
   flexDirection: 'row'
  },

  NameTextstyle : {
 color: '#000000',
 fontWeight: '600',
 fontSize: 18,
 lineHeight: 22.63
  },

  dailyAttendanceContainer : {
    flexDirection: 'row',
    backgroundColor: '#7869E6',
    height: 40,
    width: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 38
  },

  dailyAttedanceTeaxtstyle : {
   color: "#FFFFFF",
     fontWeight: '500',
     fontSize: 12,
     lineHeight: 16.37
  },

  calenderButton : {
  flexDirection: 'row',  
   marginTop: 4,
   
  },

  textContainer :{
    backgroundColor: "#7869E6",
    height: 20,
     width: 77,
     justifyContent: 'center',
   alignItems: 'center',
  },

  iconContainer : {
    backgroundColor: "#7869E6",
    height: 20,
     width: 20,
     marginHorizontal: 1,
     justifyContent: 'center',
   alignItems: 'center'
  },

  dataText : {
   color: '#FFFFFF'
  },

  line : {
    marginTop: 20,
    marginBottom: 20,   
   borderColor: "#D0D0D0",
   borderWidth: 0.2,
   marginLeft: 8
  },

  Totalstudent : {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  AllStudentsText : {
color: "#000000",
fontWeight: '600',
fontSize: 18,
lineHeight: 22.63,
left: 18
  },

  MarkallpresentContainer : {
    flexDirection: 'row',
    marginEnd: 15
  },

MarkallpresentText : {
color: '#7869E6',
fontWeight: '600',
fontSize: 18,
lineHeight: 22.63,
  },

  calenderContainer : {
    position: 'absolute',
    top: 50, 
    left: 0, 
    zIndex: 1, 
    backgroundColor: 'white', 
    borderRadius: 8
  },

  AttendanceListContainer : {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30
      
  },

  UsernameStyle : {
     width: 82,
     height: 32,
      marginTop:8
  },

  Firstnamestyle : {
  color: '#333333',
  fontWeight: '600',
  fontSize: 14,
  lineHeight: 15
  },

  Lastnamestyle : {
    color: '#777777',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 15
  },

  ProfileImage : {
    height: 48,
    width: 48,
    borderRadius: 25,
  },


  AttendanceoptionListConatiner : {
    flexDirection: 'row',
  },

  AttendanceoptionListConatinerhide : {
    flexDirection: 'row',
     marginLeft: 105
  },

  SelectedAttendance : {
    width: 24,
    height: 24,
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:8,
    marginHorizontal: 10
   
  },

  AfterSelectedAttendance : {
    width: 24,
    height: 24,
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:8,
    marginHorizontal: 10,
    marginLeft: 114
  },
  TextStyle: {
    fontWeight: '600',
    color: '#333333',
    fontSize: 13
  },

  EditButtonContainer : {
   marginTop: 11,
   marginLeft: 14
  },

  EditButton : {
    width: 16,
    height: 16,
    marginTop: 13
  },

  Notification : {
    marginTop:8,
    height: 24,
    width: 24
  }
  
});

export default Attendance;
