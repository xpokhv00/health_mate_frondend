import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/home/Home";
import { Register } from "../screens/auth/Register";
import { Login } from "../screens/auth/Login";
import { Chat } from "../screens/chats/Chat";
import { AuthType } from "../screens/auth/AuthType";
import { AIChat } from "../screens/chats/AIChat";
import { PatientInfo } from "../screens/doctor/PatientInfo";
import { MakeAppointment } from "../screens/record/MakeAppointment";
import { PrescribeMedicine } from "../screens/doctor/PrescribeMedicine";
import { RecordDiagnosis } from "../screens/record/RecordDiagnosis";
import IconFeather from 'react-native-vector-icons/Feather';
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profile } from "../screens/auth/profile/Profile";
import { ContactDoctor } from "../screens/chats/ContactDoctor";
import { DoctorQRcode } from "../screens/doctor/DoctorQRcode";
import { DoctorHome } from "../screens/doctor/DoctorHome";
import { GeneralDoctorInfo } from "../screens/auth/profile/GeneralDoctorInfo";
import { PatientMedicalCondition } from "../screens/auth/profile/PatientMedicalCondition";
import { GeneralPatientInfo } from "../screens/auth/profile/GeneralPatientInfo";


const Stack = createStackNavigator();


export function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName={"AuthType"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={MyTabs} />
      <Stack.Screen name={"Register"} component={Register} />
      <Stack.Screen name={"Login"} component={Login} />
      <Stack.Screen name={"DoctorChat"} component={Chat} />
      <Stack.Screen name={"AuthType"} component={AuthType} />
      <Stack.Screen name={"AIChat"} component={AIChat} />
      <Stack.Screen name={"PatientInfo"} component={PatientInfo} />
      <Stack.Screen name={"MakeAppointment"} component={MakeAppointment} />
      <Stack.Screen name={"PrescribeMedicine"} component={PrescribeMedicine} />
      <Stack.Screen name={"RecordDiagnosis"} component={RecordDiagnosis} />
      <Stack.Screen name={"ContactDoctor"} component={ContactDoctor} />
      <Stack.Screen name={"GeneralPatientInfo"} component={GeneralPatientInfo} />
      <Stack.Screen name={"GeneralDoctorInfo"} component={GeneralDoctorInfo} />
      <Stack.Screen name={"DoctorMain"} component={DoctorHome} />
      <Stack.Screen name={"MedicalCondition"} component={PatientMedicalCondition} />
      <Stack.Screen name={"DoctorQRcode"} component={DoctorQRcode} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen options={{
        tabBarIcon: ({color, size}) => (
          <IconFeather name="home" size={25} color="rgb(9,2,83)" />
        ),
      }} name="Home" component={Home} />
      <Tab.Screen options={{
        tabBarIcon: ({color, size}) => (
          <IconFeather name="message-square" size={25} color="rgb(9,2,83)" />
        ),
      }} name="Chat" component={Chat} />
      <Tab.Screen options={{
        tabBarIcon: ({color, size}) => (
          <IconFeather name="user" size={25} color="rgb(9,2,83)" />
        ),
      }} name="Info" component={Profile} />
    </Tab.Navigator>
  );
}
