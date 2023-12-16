import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import medicalConditionsIcon from '../../../assets/medicalConditions.png';
import docIcon from '../../../assets/doc.png';
import { Header } from "../../../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../../../store/store";

export function Profile({ navigation }: any) {
  // State variables and Redux state selectors
  const [identity, setIdentity] = useState<any>()
  const userInfo = useAppSelector((state) => state.Info.userInfo)

  // Logout function
  const Logout = async () => {
    // Remove tokens and navigate to the authentication screen
    await AsyncStorage.removeItem("tokens")
    navigation.navigate("AuthType")
  }

  const dispatch = useAppDispatch()

  // Function to load user information from tokens
  const load = async () => {
    const tokens = await AsyncStorage.getItem("tokens");
    if (tokens != null) {
      const parsedTokens = JSON.parse(tokens);
      const identity: { doctor: boolean, user_id: string } = parsedTokens && jwt_decode(parsedTokens.access);
      setIdentity(identity)
    }
  }

  // UseEffect to load user information on component mount
  useEffect(() => {
    load()
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Header component */}
      <Header title={"Profile"}/>
      {/* ScrollView containing profile information */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        {/* Display user's name */}
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{userInfo.profile.name}</Text>
        {/* Section for QR code */}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            {/* Information for doctor */}
            <Text style={{ marginTop: 5 }}>
              Have your doctor scan the QR code for more information
            </Text>
            {/* Display doctor icon */}
            <Image source={docIcon} style={{ width: 100, height: 100, borderRadius: 50, marginTop: 10 }} />
          </View>
          {/* QR code section */}
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            {/* Generate QR code using user_id */}
            {  <QRCode value={JSON.stringify(identity?.user_id) || "0"} size={128} />}
          </View>
        </View>
        {/* Options for medical information */}
        <View style={{ marginTop: 30 }}>
          {/* Button to navigate to Medical Condition screen */}
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
              navigation.navigate("MedicalCondition", {identity})
            }}
          >
            {/* Medical Conditions icon */}
            <Image source={medicalConditionsIcon} style={{ width: 24, height: 24, marginRight: 10 }} />
            <Text>Medical Condition</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
