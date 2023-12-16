import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { Header } from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import user from "../../api/user.service";
import { useAppSelector } from "../../store/store";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-paper";

export const PrescribeMedicine = (props: any) => {
  const {userId} = props.route.params;
  const [times, setTimes] = useState<Array<{time: string, taken: boolean}>>([]);
  const [medication, setMedication] = useState('');
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('7');
  const [dosage, setDosage] = useState('3');
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const medications : Array<{name: string, id: number}> = useAppSelector((state) => state.Info.medications)

  const handleConfirmTime = (selectedDate: Date) => {
    const selectedTime = `${selectedDate.getHours()}:${selectedDate.getMinutes()}`;
    setTimes([...times, {time: selectedTime, taken: false}]);
    hideTimePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const handleSubmit = () => {
    user.prescribeMedecine(userId, {
      times: JSON.stringify(times),
      medication: medication.id,
      name,
      duration,
      dosage
    }).then(r => {
      props.navigation.goBack()
    })

  };

  const ClearTimes = () => {
    setTimes([])
  }

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <Header title='Prescribe Medicine'/>
      <Text style={styles.header}>Medicine Information</Text>
      <View style={styles.regularText}>
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <Text style={{paddingVertical: 10}}>Medication</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={medication}
            onValueChange={(itemValue: any, itemIndex: number) => setMedication(itemValue)}
          >
            {medications?.map((med: any) => <Picker.Item label={med.name}  value={med} />)}
          </Picker>
        </View>
      </View>
      <View style={styles.dosageDurationContainer}>
        <View style={styles.dosageDuration}>
          <Text>Dosage</Text>
          <TextInput
            keyboardType={"numeric"}
            style={styles.input}
            value={dosage}
            onChangeText={setDosage}
          />
        </View>
        <View style={styles.dosageDuration}>
          <Text>Duration</Text>
          <TextInput
            keyboardType={"numeric"}
            style={styles.input}
            value={duration}
            onChangeText={setDuration}
          />
        </View>
      </View>
      <View style={styles.regularText}>
        <Text>Times for Treatment</Text>
        <TouchableOpacity onPress={showTimePicker}>
          <Text style={styles.input}>{times.length === 0 ? "Select time" : times.map(time => time.time).join(", ")}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmTime}
          onCancel={hideTimePicker}
        />
       <CustomButton onPress={() => ClearTimes()}>Clear</CustomButton>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton onPress={handleSubmit}>Continue</CustomButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    padding: 20,
  },

  regularText: {
    paddingLeft: 20,
    fontSize: 15,
  },

  mainContainer: {
  },
  dosageDurationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  dosageDuration: {
    flex: 1,
    width: "40%",
  },

  buttonContainer: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    width: '90%',
    minWidth: '45%',
    height: 40,
    borderColor: 'gray',
    color: "#000",
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },

  fromToContainer: {
    flexDirection: "row",
    width: '90%',
    justifyContent: 'space-between',
  },

  pickerContainer: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
  },


})
