import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import { useAppSelector } from "../../store/store";
import user from "../../api/user.service";

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
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Contact a Doctor</Text>
        <Picker
          selectedValue={selectedDoctor}
          style={{ height: 50, width: '100%', borderColor: 'gray', borderWidth: 1, borderRadius: 10, padding: 10 }}
          onValueChange={(itemValue: any, itemIndex: number) => setSelectedDoctor(itemValue)}
        >
          {doctors?.map((doc: any) => <Picker.Item label={doc.profile.name + " " + doc.profile.profession }  value={doc.email} />)}
          <Picker.Item label="Dr. Reuben Abati" value="dr.reuben@abati.tv" />
          <Picker.Item label="Dr. Med. Franz Abt" value="abt@franz.ch" />
        </Picker>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>Your message</Text>
          <TextInput
            style={{
              height: 120,
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              textAlignVertical: 'top',
            }}
            multiline
            placeholder="Write your message here..."
            value={message}
            onChangeText={text => setMessage(text)}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#61E084',
            borderRadius: 10,
            padding: 10,
            alignItems: 'center',
            marginVertical: 20,
          }}
          onPress={handleSendMessage}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Send</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
