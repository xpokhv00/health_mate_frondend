import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import medicalConditionsIcon from '../assets/medicalConditions.png';
import medicalHistoryIcon from '../assets/medicalHistory.png';
import docIcon from '../assets/doc.png';
import { Header } from "../components/Header";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Profile({ navigation }: any) {
  const [userId, setUserId] = useState( '0'
    // localStorage.getItem('access_token') ? parseJwt(localStorage.getItem('access_token')).user_id : '0'
  );

  useEffect(() => {
    // if (localStorage.getItem('access_token')) {
    //   let token = localStorage.getItem('access_token');
    //   setUserId(parseJwt(token).user_id);
    // }
  }, []);

  const Logout = async () => {
    await AsyncStorage.removeItem("tokens")
    navigation.navigate("AuthType")
  }

  return (
    <View style={{ flex: 1 }}>
      <Header title={"Profile"}/>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Max Mustermann</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ marginTop: 5 }}>
              Have your doctor scan the QR code for more information
            </Text>
            <Image source={docIcon} style={{ width: 100, height: 100, borderRadius: 50, marginTop: 10 }} />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <QRCode value={userId ? userId.toString() : '0'} size={128} />
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#61E084',
              borderRadius: 12,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
            onPress={() => {
              // Handle Medical History button press
            }}
          >
            <Image source={medicalHistoryIcon} style={{ width: 24, height: 24, marginRight: 10 }} />
            <Text>Medical History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#61E084',
              borderRadius: 12,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              // Handle Medical Condition button press
            }}
          >
            <Image source={medicalConditionsIcon} style={{ width: 24, height: 24, marginRight: 10 }} />
            <Text>Medical Condition</Text>
          </TouchableOpacity>

        </View>
        <Button onPress={() => Logout()}>Log Out</Button>

      </ScrollView>
    </View>
  );
}
