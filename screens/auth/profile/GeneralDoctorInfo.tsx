// Importing necessary modules from React and React Native
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

// Importing user service from API and custom components
import user from "../../../api/user.service";
import CustomButton from "../../../components/CustomButton";
import { Header } from "../../../components/Header";

// Functional component for gathering general doctor information
export function GeneralDoctorInfo(props: any) {
  // Destructuring necessary values from props
  const { navigation } = props;
  const { identity } = props.route.params;

  // State variables to hold input values
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [profession, setProfession] = useState("");
  const [address, setAddress] = useState("");

  // Handlers to update state variables based on input changes
  const handleFirstname = (text: any) => {
    setFirstname(text);
  };

  const handleLastname = (text: any) => {
    setLastname(text);
  };

  const handleProfession = (text: any) => {
    setProfession(text);
  };

  const handleAddress = (text: any) => {
    setAddress(text);
  };

  // Function to handle the 'Continue' button press
  const handleNext = () => {
    // Sending gathered information to the user service API
    user.postInfo({ name: firstname + " " + lastname, profession, address, user: identity.user_id }).then(r  => {
      // Navigating to the DoctorMain screen upon successful submission
      navigation.navigate("DoctorMain");
    });
  };
  // Render function returning JSX elements
  return (
    <>
      <Header title={"General Info"}/>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>General Information</Text>

        <View style={{ flexDirection: "row", padding: 20 }}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <Text style={{ fontSize: 16 }}>First name</Text>
            <TextInput
              style={{ borderColor: "gray", borderWidth: 1, padding: 10, borderRadius: 8 }}
              onChangeText={handleFirstname}
              value={firstname}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text style={{ fontSize: 16 }}>Last name</Text>
            <TextInput
              style={{ borderColor: "gray", borderWidth: 1, padding: 10, borderRadius: 8 }}
              onChangeText={handleLastname}
              value={lastname}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", padding: 20 }}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <Text style={{ fontSize: 16 }}>Profession</Text>
            <TextInput
              style={{ borderColor: "gray", borderWidth: 1, padding: 10, borderRadius: 8 }}
              onChangeText={handleProfession}
              value={profession}
            />
          </View>
          <View style={{ flex: 1, marginRight: 5 }}>
            <Text style={{ fontSize: 16 }}>Address</Text>
            <TextInput
              style={{ borderColor: "gray", borderWidth: 1, padding: 10, borderRadius: 8 }}
              onChangeText={handleAddress}
              value={address}
            />
          </View>
        </View>

        <CustomButton onPress={handleNext}>Continue</CustomButton>
      </View>
    </>
  );
}
