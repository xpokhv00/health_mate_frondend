import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function GeneralInfo(props: any) {
  const { navigation } = props;

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleFirstname = (text: any) => {
    setFirstname(text);
  };

  const handleLastname = (text: any) => {
    setLastname(text);
  };

  const handleHeight = (text: any) => {
    setHeight(text);
  };

  const handleWeight = (text: any) => {
    setWeight(text);
  };

  const handleNext = () => {
    // Replace localStorage with AsyncStorage or any other storage mechanism.
    // For this example, we'll keep it simple using console.log.
    // AsyncStorage.setItem("firstname", firstname);
    // AsyncStorage.setItem("lastname", lastname);
    // AsyncStorage.setItem("height", height);
    // AsyncStorage.setItem("weight", weight);

    navigation.navigate("Preconditions");
  };

  return (
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
          <Text style={{ fontSize: 16 }}>Height (in cm)</Text>
          <TextInput
            style={{ borderColor: "gray", borderWidth: 1, padding: 10, borderRadius: 8 }}
            onChangeText={handleHeight}
            value={height}
            keyboardType="numeric"
          />
        </View>
        <View style={{ flex: 1, marginRight: 5 }}>
          <Text style={{ fontSize: 16 }}>Weight (in kg)</Text>
          <TextInput
            style={{ borderColor: "gray", borderWidth: 1, padding: 10, borderRadius: 8 }}
            onChangeText={handleWeight}
            value={weight}
            keyboardType="numeric"
          />
        </View>
      </View>

      <Button title="Continue" onPress={handleNext} />
    </View>
  );
}
