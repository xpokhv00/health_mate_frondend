import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IUserInfo } from '../../../types/User';
import user from '../../../api/user.service';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from 'react-native-paper';

export function Allergies(props: any) {
  const {navigation} = props;
  const [allergies, setAllergies] = useState<string[]>([]);
  const [newAllergie, setNewAllergie] = useState<string>('');

  const handleAddCondition = () => {
    if (newAllergie.trim() !== '') {
      setAllergies([...allergies, newAllergie]);
      setNewAllergie('');
    }
  };

  const handleSubmit = async () => {
    // Instead of using localStorage, you might want to use AsyncStorage in a real React Native project.
    // For this example, we'll keep it simple using localStorage.
    // Import AsyncStorage from 'react-native' and use it for data storage.

    // Construct the dataUserInfo object
    let dataUserInfo: IUserInfo = {
      // age: parseInt(localStorage.getItem('age') || '0', 10),
      //TODO: calculate age from the current date - getItem('age')
      age: 25, // Sample age
      gender: await AsyncStorage.getItem('gender') || '',
      height: parseInt(await AsyncStorage.getItem('height') || '0', 10),
      weight: parseInt(await AsyncStorage.getItem('weight') || '0', 10),
      name: (await AsyncStorage.getItem('firstname') || '') + (await AsyncStorage.getItem('lastname') || ''),
      preconditions: await AsyncStorage.getItem('preconditions') || '',
      allergies: JSON.stringify(allergies), // Store allergies as a JSON string
    };
    console.log(dataUserInfo);

    // Replace the user.postInfo with your API call
    // For simplicity, we're using a placeholder 'postInfo' function here.
    user.postInfo(dataUserInfo)
      .then((response: any) => {
        console.log(response);
        navigation.navigate("Home"); // Navigate to the Home screen
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}} >
      <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 20 }}>Add Allergie</Text>
      <TextInput
        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 8, width: 250 }}
        placeholder="Enter an allergie"
        value={newAllergie}
        onChangeText={(text) => setNewAllergie(text)}
      />

      <Button  onPress={handleAddCondition} >Add</Button>

      <Button onPress={handleSubmit} >Continue</Button>
    </View>
  );
}
