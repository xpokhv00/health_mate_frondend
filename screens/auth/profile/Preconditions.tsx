import React, { useState } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

export function Preconditions(props: any) {
  const {navigation} = props;
  const [preconditions, setPreconditions] = useState<Array<any>>([]);
  const [newCondition, setNewCondition] = useState('');

  const handleAddCondition = () => {
    if (newCondition.trim() !== '') {
      setPreconditions([...preconditions, newCondition]);
      setNewCondition('');
    }
  };

  const handleNext = () => {
    // Replace localStorage with AsyncStorage or any other storage mechanism.
    // For this example, we'll keep it simple using console.log.
    // AsyncStorage.setItem("preconditions", JSON.stringify(preconditions));

    navigation.navigate("Allergies");
  };

  return (
    <View style={{  alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Add medical preconditions</Text>

      <FlatList
        data={preconditions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              borderColor: 'gray',
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
              marginTop: 10,
              width: 250
            }}
          >
            <Text>{item}</Text>
          </View>
        )}
      />

      <TextInput
        placeholder="Enter a precondition"
        value={newCondition}
        onChangeText={(text) => setNewCondition(text)}
        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, margin: 10, borderRadius: 8, width: 250 }}
      />

      <Button onPress={handleAddCondition} >Add</Button>

      <Button onPress={handleNext} >Continue</Button>
    </View>
  );
}
