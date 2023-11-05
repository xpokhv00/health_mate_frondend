import React, { useState } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import user from '../../api/user.service';

export function PrescribeMedicine({ route, navigation }: any) {
    const { userId } = route.params;

    const [name, setName] = useState('');
    const [dose, setDose] = useState('');
    const [dailyDosage, setDailyDosage] = useState(0);
    const [medTimes, setMedTimes] = useState<Array<any>>([]);
    const [newMedTime, setNewMedTime] = useState('');
    const [duration, setDuration] = useState('');
    const [notes, setNotes] = useState('');

    const handleAddMedTime = () => {
        if (newMedTime.trim() !== '') {
            setMedTimes([...medTimes, newMedTime]);
            setNewMedTime('');
        }
    };

    const handleSubmit = () => {
        const prescription = {
            name,
            dose,
            dosage: 10,
            times: JSON.stringify(medTimes),
            duration,
            date: Date.now(),
            notes,
        };

        user
          .prescribeMedecine(userId, prescription)
          .then((response: any) => {
              console.log(response);
              navigation.navigate('DoctorMain');
          })
          .catch((error: any) => {
              console.log(error);
          });
    };

    return (
      <View  style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
          <Text>General Information</Text>

          <View style={{ flexDirection: 'row', margin: 20 }}>
              <TextInput
                placeholder="Name"
                style={{  marginRight: 5, borderWidth: 1, borderRadius: 5, width: 120 }}
                value={name}
                onChangeText={(text) => setName(text)}
              />
              <TextInput
                placeholder="Dose"
                style={{ marginLeft: 5, borderWidth: 1, borderRadius: 5, width: 120 }}
                value={dose}
                onChangeText={(text) => setDose(text)}
              />
          </View>

          <TextInput
            placeholder="Daily Dosage"
            style={{ borderWidth: 1, borderRadius: 5, width: 250 }}
            value={dailyDosage.toString()}
            onChangeText={(text) => setDailyDosage(parseInt(text))}
            keyboardType="numeric"
          />

          <Text>Medication Times (hh:mm)</Text>
          {/*<FlatList*/}
          {/*  data={medTimes}*/}
          {/*  renderItem={({ item }) => (*/}
          {/*    <View style={{ borderWidth: 1, borderRadius: 5, margin: 2, padding: 4 }}>*/}
          {/*        <Text>{item}</Text>*/}
          {/*    </View>*/}
          {/*  )}*/}
          {/*  keyExtractor={(item, index) => index.toString()}*/}
          {/*/>*/}

          <TextInput
            placeholder="Enter time"
            style={{ borderWidth: 1, borderRadius: 5, width: 250 }}
            value={newMedTime}
            onChangeText={(text) => setNewMedTime(text)}
          />
        <Button onPress={handleAddMedTime} >Add</Button>

          <TextInput
            placeholder="Duration"
            style={{ borderWidth: 1, borderRadius: 5, width: 250 }}
            value={duration}
            onChangeText={(text) => setDuration(text)}
          />

          <TextInput
            placeholder="Notes"
            style={{ borderWidth: 1, borderRadius: 5, height: 80, textAlignVertical: 'top', width: 250 }}
            multiline
            value={notes}
            onChangeText={(text) => setNotes(text)}
          />

        <Button onPress={handleSubmit} >Prescribe Medicine</Button>
      </View>
    );
}

