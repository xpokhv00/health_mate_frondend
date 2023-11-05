import React, { useState } from 'react';
import { View, Text, TextInput} from 'react-native';
import auth from '../../api/auth.service'
import { ILogin } from "../../types/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { Button } from 'react-native-paper';


export function Login(props: any) {
    const {navigation} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (text: any) => {
        setEmail(text);
    };

    const handlePassword = (text: any) => {
        setPassword(text);
    };

    const handleSubmit = () => {
        let loginData: ILogin = {
            email : email,
            password: password
        };

        //TODO: instead of removing redirect(logged in) token check in api
        AsyncStorage.removeItem("access_token")

        auth.login(loginData)
          .then( async (response: any) => {
              if (response && response.access) {
                  await AsyncStorage.setItem("access_token", response.access)
              }
              let identity: any = jwtDecode(response.access);
              if (identity.doctor) {
                  //TODO: doctors page
                  navigation.navigate("Doctor")
              } else if (!identity.doctor) {
                navigation.navigate("Home")
              }
          })
          .catch((error) => {
              AsyncStorage.removeItem("access_token")
              console.log(error)
          })
    };

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Log in to your account :)</Text>

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

        <Button onPress={handleSubmit} >Login</Button>
      </View>
    );
}
