import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import auth from "../../api/auth.service";
import { ILogin } from "../../types/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import CustomButton from "../../components/CustomButton";

export function Login(props: any) {
  const { navigation } = props;

  // State variables to store email and password entered by the user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Functions to handle changes in email and password TextInput
  const handleEmail = (text: any) => {
    setEmail(text);
  };

  const handlePassword = (text: any) => {
    setPassword(text);
  };

  // Function to handle form submission on button press
  const handleSubmit = () => {
    let loginData: ILogin = {
      email: email,
      password: password
    };

    // Removing any existing access token (temporary solution)
    AsyncStorage.removeItem("access_token");

    // Initiating login request with the provided credentials
    auth.login(loginData)
      .then(async (response: any) => {
        if (response && response.access) {
          // Storing received tokens in AsyncStorage
          await AsyncStorage.setItem("tokens", JSON.stringify(response));
        }
        let identity: any = jwt_decode(response.access);
        console.log("Identity: ", identity);

        // Redirecting based on the user type (doctor or regular user)
        if (identity.doctor) {
          navigation.navigate("DoctorMain");
        } else if (!identity.doctor) {
          navigation.navigate("Home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Log in to your account :)</Text>

      {/* Email TextInput */}
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.regularText}>E-Mail</Text>
        <TextInput
          style={{ borderColor: "gray", borderWidth: 1, padding: 10, borderRadius: 8, width: 250 }}
          onChangeText={handleEmail}
          value={email}
          autoCapitalize="none"
        />
      </View>

      {/* Password TextInput */}
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.regularText}>Password</Text>
        <TextInput
          style={{ borderColor: "gray", borderWidth: 1, padding: 10, borderRadius: 8, width: 250 }}
          onChangeText={handlePassword}
          value={password}
          secureTextEntry={true}
        />
      </View>

      {/* Custom login button */}
      <View style={{ width: "80%", alignItems: "center", justifyContent: "center" }}>
        <CustomButton onPress={handleSubmit}>Login</CustomButton>
      </View>
    </View>
  );
}

// Stylesheet for the regular text styles
const styles = StyleSheet.create({
  regularText: {
    fontSize: 15,
    paddingVertical: 10,
  }
})
