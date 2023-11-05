import React, { useState } from 'react';
import { View, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-paper';

export function Birthday(props: any) {
  const [birthday, setBirthday] = useState(new Date());
  const {navigation} = props;

  const handleDateChange = (event: any, selectedDate: any) => {
    if (selectedDate) {
      setBirthday(selectedDate);
    }
  };

  const handleNext = () => {
    // Format the selected date to match your expected format (YYYY-MM-DD).
    const formattedBirthday = birthday.toISOString().split('T')[0];
    console.log(formattedBirthday); // You can check the formatted date in the console.

    // Replace localStorage with AsyncStorage or any other storage mechanism.
    // For this example, we'll keep it simple using console.log.
    // AsyncStorage.setItem("birthday", formattedBirthday)

    navigation.navigate("GeneralInfo");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 20 }}>What is your birthday?</Text>
      <DateTimePicker
        value={birthday}
        mode="date"
        display="default"
        onChange={handleDateChange}
      />

      <Button onPress={handleNext} >Continue</Button>
    </View>
  );
}
