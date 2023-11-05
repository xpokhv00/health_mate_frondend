import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';

import {
    createDrawerNavigator,
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import bluePattern from '../assets/sideBar/bluePattern.jpg';
import SBLogo from '../assets/sideBar/iconektLogo.png';
import MyProfile from '../assets/sideBar/icoDrawerMyProfile.png';
import Bills from '../assets/sideBar/icoDrawerBills.png';
import Preferences from '../assets/sideBar/icoDrawerPreferences.png';
import SBarticleBlack from '../assets/sideBar/articleBlack.png';
import LogoutIcon from '../assets/sideBar/icoDrawerLogout.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Forward from '../assets/homeAssets/Forward.png';
import { createStackNavigator } from '@react-navigation/stack';
import {Register} from '../screens/auth/Register';
import {Login} from '../screens/auth/Login';
import {Logout} from '../screens/auth/Logout';
import {Chat} from "../screens/chats/Chat";
import {AIChat} from "../screens/chats/AIChat";
import {AuthType} from "../screens/auth/AuthType";
import {Medication} from "../screens/info/Medication";
import {PatientInfo} from "../screens/doctor/PatientInfo";
import {QRWindow} from "../screens/qr/QRWindow";
import {MakeAppointment} from "../screens/record/MakeAppointment";
import {PrescribeMedicine} from "../screens/doctor/PrescribeMedicine";
import {RecordDiagnosis} from "../screens/record/RecordDiagnosis";
import {BottomTabNavigator} from "./BottomNavigation";

const Drawer = createDrawerNavigator();

const StackSetting = createStackNavigator();

export const AppStack = () => {
    return (
        <StackSetting.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={'Home'}>
            <StackSetting.Screen name={'Home'} component={DrawerNavigator} />
            <StackSetting.Screen name={'Register'} component={Register} />
            <StackSetting.Screen name={'Login'} component={Login} />
            <StackSetting.Screen name={'Logout'} component={Logout} />
            <StackSetting.Screen name={'DoctorChat'} component={Chat}/>
            <StackSetting.Screen name={'Preview'} component={AuthType}/>
            <StackSetting.Screen name={'AIChat'} component={AIChat}/>
            <StackSetting.Screen name={'Medication'} component={Medication}/>
            <StackSetting.Screen name={'PatientInfo'} component={PatientInfo}/>
            <StackSetting.Screen name={'QRWindow'} component={QRWindow}/>
            <StackSetting.Screen name={'MakeAppointment'} component={MakeAppointment}/>
            <StackSetting.Screen name={'PrescribeMedicine'} component={PrescribeMedicine}/>
            <StackSetting.Screen name={'RecordDiagnosis'} component={RecordDiagnosis}/>
        </StackSetting.Navigator>
    );
};

function CustomDrawerContent(props) {
    const SBItem = ({icon, title, path, type}) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate(path)}>
                <View
                    style={{
                        flexDirection: 'row',
                        margin: 16,
                        justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                        {type === 'icon' ? icon : <Image source={icon} />}
                        <Text
                            style={{
                                color: 'rgb(33, 30, 115)',
                                fontSize: 14,
                                fontWeight: '600',
                                alignSelf: 'center',
                                marginHorizontal: 16,
                            }}>
                            {title}
                        </Text>
                    </View>
                    <Image style={{width: 24, height: 24}} source={Forward} />
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <DrawerContentScrollView {...props}>
            <ImageBackground
                style={{
                    width: '100%',
                    marginTop: -10,
                    height: 117,
                    justifyContent: 'center',
                }}
                source={bluePattern}>
                <Image style={{marginLeft: 20, height: 31, width: 100}} source={SBLogo} />
            </ImageBackground>
            <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
                <View
                    style={{
                        flexDirection: 'row',
                        margin: 16,
                        justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={MyProfile} />
                        <Text
                            style={{
                                color: 'rgb(33, 30, 115)',
                                fontSize: 14,
                                fontWeight: '600',
                                alignSelf: 'center',
                                marginHorizontal: 16,
                            }}>
                            My Profile
                        </Text>
                    </View>
                    <Image style={{width: 24, height: 24}} source={Forward} />
                </View>
            </TouchableOpacity>
            <SBItem icon={Bills} title="Bills History" path="Control" />
            <SBItem icon={Preferences} title="Preferences" path="Control" />
            <SBItem icon={SBarticleBlack} title="Terms and Conditions" path="Terms" />
            <SBItem icon={LogoutIcon} title="Logout" path="Logout" />
            <SBItem
                type={'icon'}
                icon={
                    <Icon
                        style={{fontSize: 25, color: 'rgb(33, 30, 115)'}}
                        name={'home-plus-outline'}
                    />
                }
                title="Areas"
                path="Areas"
            />
        </DrawerContentScrollView>
    );
}

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: {backgroundColor: 'rgb(46, 45, 134)'},
            }}>
            <Drawer.Screen
                options={{headerShown: false}}
                name="My Profile"
                component={BottomTabNavigator}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
