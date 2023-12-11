import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IRegister } from "../../types/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "../../api/auth.service";
import jwt_decode from "jwt-decode";

export function Register(props: any) {
    const {navigation} = props;
    const [role, setRole] = useState('patient');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (text: any) => {
        setEmail(text);
    };

    const handlePassword = (text: any) => {
        setPassword(text);
    };

    const handleSubmit = () => {
      let registerData: IRegister = {
        email : email,
        password: password,
        doctor: (role !== "patient" )
      };

      //TODO: instead of removing redirect(logged in) token check in api
      AsyncStorage.removeItem("access_token")

      auth.register(registerData)
        .then( async (response: any) => {
          if (response && response.access) {
            await AsyncStorage.setItem("access_token", response.access)
          }
          let identity: any = jwt_decode(response.access);
          console.log(identity)
          console.log(response)
          if (identity.doctor === true) {
            //TODO: doctors page
            navigation.navigate("DoctorMain")
          } else if (identity.doctor === false) {
            navigation.navigate("Gender")
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

          <View style={{ marginVertical: 10 }}>
              <Text>E-Mail</Text>
              <TextInput
                style={{ borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 8, width: 250 }}
                onChangeText={handleEmail}
                value={email}
                autoCapitalize="none"
              />
          </View>

          <View style={{ marginVertical: 10 }}>
              <Text>Password</Text>
              <TextInput
                style={{ borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 8, width: 250 }}
                onChangeText={handlePassword}
                value={password}
                secureTextEntry={true}
              />
          </View>

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
