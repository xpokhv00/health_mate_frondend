import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import googleIcon from '../../assets/googleIcon.png';
import IconFeather from "react-native-vector-icons/Feather";

export function AuthType(props: any) {
    const {navigation} = props;

    const handleContinueWithGoogle = () => {
        // Handle Google authentication here
    };

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Hey there, nice to meet you 👋</Text>
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
          <TouchableOpacity
            style={{ alignItems: 'center', marginVertical: 10 }}
            onPress={() => navigation.navigate('Register')}
          >
              <Text>Register</Text>
          </TouchableOpacity>
      </View>
    );
}
