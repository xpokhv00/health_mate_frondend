import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';

export function Gender(props: any) {
  const {navigation} = props;
  const [gender, setGender] = useState('female');

  const handleGenderChange = (selectedGender: any) => {
    setGender(selectedGender);
  };

  const handleNext = () => {
    // Replace localStorage with AsyncStorage or any other storage mechanism.
    // For this example, we'll keep it simple using console.log.
    // AsyncStorage.setItem("gender", gender);

    navigation.navigate("Birthday");
  };

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Let’s get to know each other</Text>
      <Text style={{ fontSize: 16, marginVertical: 10 }}>I am a ...</Text>

      <TouchableOpacity
        style={{
          backgroundColor: gender === 'female' ? '#61E084' : '#F6F6F6',
          borderRadius: 8,
          padding: 12,
          marginVertical: 10,
          alignItems: 'center',
        }}
        onPress={() => handleGenderChange('female')}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Female</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: gender === 'male' ? '#61E084' : '#F6F6F6',
          borderRadius: 8,
          padding: 12,
          marginVertical: 10,
          alignItems: 'center',
        }}
        onPress={() => handleGenderChange('male')}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Male</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: gender === 'other' ? '#61E084' : '#F6F6F6',
          borderRadius: 8,
          padding: 12,
          marginVertical: 10,
          alignItems: 'center',
        }}
        onPress={() => handleGenderChange('other')}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Other</Text>
      </TouchableOpacity>

      <Button title="Continue" onPress={handleNext} />
    </View>
  );
}
