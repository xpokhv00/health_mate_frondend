import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { IRegister } from "../../types/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "../../api/auth.service";
import jwt_decode from "jwt-decode";

export function Register(props: any) {
  const {navigation} = props;

  // State variables to manage role, email, and password for registration
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Functions to handle changes in email and password TextInput
  const handleEmail = (text: any) => {
    setEmail(text);
  };

  const handlePassword = (text: any) => {
    setPassword(text);
  };

  // Function to handle form submission for user registration
  const handleSubmit = () => {
    let registerData: IRegister = {
      email : email,
      password: password,
      doctor: (role !== "patient" )
    };

    // Removing any existing access token (temporary solution)
    AsyncStorage.removeItem("access_token");

    // Initiating user registration with the provided credentials
    auth.register(registerData)
      .then(async (response: any) => {
        if (response && response.access) {
          // Storing received tokens in AsyncStorage
          await AsyncStorage.setItem("tokens", JSON.stringify(response))
        }
        let identity: any = jwt_decode(response.access);
        console.log(identity)
        console.log(response)
        if (identity.doctor === true) {
          // Navigating to DoctorInfo page for doctors
          navigation.navigate("GeneralDoctorInfo", {identity})
        } else if (identity.doctor === false) {
          // Navigating to PatientInfo page for patients
          navigation.navigate("GeneralPatientInfo", {identity})
        } else {
          console.log("no identity found in jwt")
        }
      })
      .catch((error: any) => {
        console.log(error)
      })
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}} >
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Create an account to continue :)</Text>

      <Text style={{ fontSize: 16, marginTop: 10 }}>I am a ...</Text>

      {/* Role selection buttons */}
      <TouchableOpacity
        style={{
          backgroundColor: role === 'patient' ? '#61E084' : '#F6F6F6',
          borderRadius: 8,
          padding: 20,
          width: 250,
          alignItems: 'center',
          marginVertical: 10,
        }}
        onPress={() => setRole('patient')}
      >
        <Text style={{ fontWeight: 'bold' }}>Patient</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: role === 'doctor' ? '#61E084' : '#F6F6F6',
          borderRadius: 8,
          padding: 20,
          width: 250,
          alignItems: 'center',
          marginVertical: 10,
        }}
        onPress={() => setRole('doctor')}
      >
        <Text style={{ fontWeight: 'bold' }}>Medical Professional</Text>
      </TouchableOpacity>

      {/* Email TextInput */}
      <View style={{ marginVertical: 10 }}>
        <Text>E-Mail</Text>
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 8, width: 250 }}
          onChangeText={handleEmail}
          value={email}
          autoCapitalize="none"
        />
      </View>

      {/* Password TextInput */}
      <View style={{ marginVertical: 10 }}>
        <Text>Password</Text>
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 8, width: 250 }}
          onChangeText={handlePassword}
          value={password}
          secureTextEntry={true}
        />
      </View>

      {/* Button to create an account */}
      <TouchableOpacity
        style={{
          backgroundColor: '#61E084',
          borderRadius: 8,
          padding: 20,
          width: 250,
          alignItems: 'center',
          marginVertical: 20,
        }}
        onPress={handleSubmit}
      >
        <Text style={{ fontWeight: 'bold' }}>Create account</Text>
      </TouchableOpacity>
    </View>
  );
}
