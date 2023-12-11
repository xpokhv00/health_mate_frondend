import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/home/Home";
import { Register } from "../screens/auth/Register";
import { Login } from "../screens/auth/Login";
import { Logout } from "../screens/auth/Logout";
import { Chat } from "../screens/chats/Chat";
import { AuthType } from "../screens/auth/AuthType";
import { AIChat } from "../screens/chats/AIChat";
import { Medication } from "../screens/info/Medication";
import { PatientInfo } from "../screens/doctor/PatientInfo";
import { QRWindow } from "../screens/qr/QRWindow";
import { MakeAppointment } from "../screens/record/MakeAppointment";
import { PrescribeMedicine } from "../screens/doctor/PrescribeMedicine";
import { RecordDiagnosis } from "../screens/record/RecordDiagnosis";
import IconFeather from 'react-native-vector-icons/Feather';
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profile } from "../screens/Profile";
import { ContactDoctor } from "../screens/chats/ContactDoctor";
import { Allergies } from "../screens/auth/profile/Allergies";
import { Birthday } from "../screens/auth/profile/Birthday";
import { Gender } from "../screens/auth/profile/Gender";
import { GeneralInfo } from "../screens/auth/profile/GeneralInfo";
import { Preconditions } from "../screens/auth/profile/Preconditions";
import { DoctorQRcode } from "../screens/doctor/DoctorQRcode";
import { DoctorHome } from "../screens/doctor/DoctorHome";


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
      <Stack.Screen name={"Logout"} component={Logout} />
      <Stack.Screen name={"DoctorChat"} component={Chat} />
      <Stack.Screen name={"AuthType"} component={AuthType} />
      <Stack.Screen name={"AIChat"} component={AIChat} />
      <Stack.Screen name={"Medication"} component={Medication} />
      <Stack.Screen name={"PatientInfo"} component={PatientInfo} />
      <Stack.Screen name={"QRWindow"} component={QRWindow} />
      <Stack.Screen name={"MakeAppointment"} component={MakeAppointment} />
      <Stack.Screen name={"PrescribeMedicine"} component={PrescribeMedicine} />
      <Stack.Screen name={"RecordDiagnosis"} component={RecordDiagnosis} />
      <Stack.Screen name={"ContactDoctor"} component={ContactDoctor} />
      <Stack.Screen name={"Allergies"} component={Allergies} />
      <Stack.Screen name={"Birthday"} component={Birthday} />
      <Stack.Screen name={"Gender"} component={Gender} />
      <Stack.Screen name={"GeneralInfo"} component={GeneralInfo} />
      <Stack.Screen name={"Preconditions"} component={Preconditions} />
      <Stack.Screen name={"DoctorMain"} component={DoctorHome} />
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
