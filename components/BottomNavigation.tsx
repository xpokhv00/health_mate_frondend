import React from 'react';
import {
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {Home} from '../screens/home/Home';
import addButtom from '../assets/plus.png';
import {createStackNavigator} from '@react-navigation/stack';
import {Chat} from "../screens/chats/Chat";
import {MakeAppointment} from "../screens/record/MakeAppointment";
import {PatientInfo} from "../screens/doctor/PatientInfo";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = ({navigation, route}: any) => {
    return (
        <Tab.Navigator
            style={{backgroundColor: 'rgb(255, 255, 255)'}}
            screenOptions={{
                tabBarVisible: false,
                tabBarActiveTintColor: 'rgb(9,2,83)',
                headerShown: false,
            }}>
            <Tab.Screen
                options={{
                    tabBarVisible: false,
                    tabBarIcon: ({color, size}) => (
                        <Icon name="home" size={25} color="rgb(9,2,83)" />
                    ),
                }}
                initialRouteName
                name="Home"
                component={Home}
            />
            <Tab.Screen
                options={{
                    tabBarVisible: false,
                    tabBarIcon: () => (
                        <IconFeather name="bar-chart-2" size={25} color="rgb(9,2,83)" />
                    ),
                }}
                name="Chat"
                component={Chat}
            />
            <Tab.Screen
                name="Add"
                options={{
                    tabBarVisible: false,
                    tabBarLabel: () => {
                        return null;
                    },
                    tabBarIcon: props => (
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 15,
                                width: 70,
                                height: 70,
                                borderRadius: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                source={addButtom}
                                style={{
                                    width: 70,
                                    height: 70,
                                    alignContent: 'center',
                                }}
                            />
                        </View>
                    ),
                }}
                component={MakeAppointment}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: () => (
                        <IconIonicons
                            name="notifications-outline"
                            size={25}
                            color="rgb(9,2,83)"
                        />
                    ),
                }}
                name="Patient"
                component={PatientInfo}
            />
        </Tab.Navigator>
    );
};
