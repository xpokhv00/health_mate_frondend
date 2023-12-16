import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import { useAppSelector } from "../../store/store";
import user from "../../api/user.service";
import CustomButton from "../../components/CustomButton";

export function ContactDoctor() {
  const [selectedDoctor, setSelectedDoctor] = useState("dr.reuben@abati.tv");
  const [message, setMessage] = useState("");
  const doctors = useAppSelector((state) => state.Info.doctors)
  console.log(doctors, "DOCTORS");
  const handleSendMessage = () => {
    // Implement sending the message to the selected doctor here
    console.log(`Selected Doctor: ${selectedDoctor}`);
    console.log(`Message: ${message}`);
    // Add logic to send the message to the doctor using an API call or other communication method
    user.doctorMessage({email: selectedDoctor, message: message})
    // Clear the message input field
    setMessage("");
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Assuming HeadNav is a custom component for navigation */}
      {/* You can include the navigation header as needed */}
      <ScrollView contentContainerStyle={{paddingLeft: 20, paddingVertical: 20, justifyContent: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Contact a Doctor</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedDoctor}
            onValueChange={(itemValue: any, itemIndex: number) => setSelectedDoctor(itemValue)}
          >
            {doctors?.map((doc: any) => <Picker.Item label={doc.profile.name + " " + doc.profile.profession }  value={doc.email} />)}
          </Picker>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.regularText}>Your message</Text>
          <TextInput
            style={{
              height: 300,
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              textAlignVertical: 'top',
              width: "90%",
            }}
            multiline
            placeholder="Write your message here..."
            value={message}
            onChangeText={text => setMessage(text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton onPress={handleSendMessage}>Send</CustomButton>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
  },

  regularText: {
    paddingVertical: 10,
    fontSize: 17,
    fontWeight: "bold",
  },

  buttonContainer: {
    marginTop: "40%",
  },

})
