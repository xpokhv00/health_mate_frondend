import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from 'react-native';

import googleIcon from '../../assets/googleIcon.png';
import IconFeather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import user from "../../api/user.service";

export function AuthType(props: any) {
  const {navigation} = props;

  // Function to handle 'Continue with Google' button press
  const handleContinueWithGoogle = () => {
    // Add logic to continue with Google authentication
  };

  // Function to load tokens from AsyncStorage
  const load = async () => {
    return await AsyncStorage.getItem("tokens")
  }

  // useEffect to check tokens on component mount
  useEffect(() => {
    load().then((tokens) => {
      console.log("TOKENS: ", tokens);
      if (tokens) {
        const parsedTokens = JSON.parse(tokens)
        const identity: { doctor: boolean, user_id: string } = parsedTokens && jwt_decode(parsedTokens.access)
        console.log(identity, "IDENTIFIER")
        try {
          // Get user information by user ID
          user.getInfoByUserId(identity.user_id).then(r => {
            console.log("REQUEST WAS SEND");
          })
          // Navigate based on user type (doctor or normal user)
          if (identity.doctor) {
            navigation.navigate("DoctorMain")
          } else {
            navigation.navigate("Home")
          }
        } catch (e) {
          // Remove tokens if error occurs
          AsyncStorage.removeItem("tokens")
        }
      }
    })
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Hey there, nice to meet you 👋</Text>
      {/* Button for 'Continue with Google' */}
      <TouchableOpacity
        style={{
          backgroundColor: '#F6F6F6',
          borderRadius: 8,
          padding: 20,
          width: 250,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 10,
        }}
        onPress={handleContinueWithGoogle}
      >
        <Image source={googleIcon} style={{ width: 24, height: 24, marginRight: 10 }} />
        <Text>Continue with Google</Text>
      </TouchableOpacity>
      <Text style={{ marginVertical: 10, color: 'gray' }}>OR</Text>
      {/* Button for 'Login with Email' */}
      <TouchableOpacity
        style={{
          backgroundColor: '#61E084',
          borderRadius: 8,
          padding: 20,
          width: 250,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 10,
        }}
        onPress={() => navigation.navigate('Login')}
      >
        <View style={{ marginRight: 10 }}><IconFeather name="user" size={25} color="rgb(9,2,83)" /></View>
        <Text>Login with Email</Text>
      </TouchableOpacity>
      {/* Button for 'Register' */}
      <TouchableOpacity
        style={{ alignItems: 'center', marginVertical: 10 }}
        onPress={() => navigation.navigate('Register')}
      >
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
