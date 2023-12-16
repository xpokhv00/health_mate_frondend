import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Header } from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import { getDoctorsThunk, getMedicationsThunk, getPatientsThunk } from "../../store/slices/info-slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import user from "../../api/user.service";

export const RecordDiagnosis = (props: any) => {
    const {userId} = props.route.params;
    // State variables to manage diagnosis details
    const [name, setName] = useState('');
    const [nextSteps, setNextSteps] = useState('');
    const [notes, setNotes] = useState('');

    // Function to clear input fields
    const clearInputs = () => {
        setName('');
        setNextSteps('');
        setNotes('');
    };

    // Function to handle form submission (recording diagnosis)
    const handleSubmit = () => {
        // Call an API function to record diagnosis with provided details
        user.prescribeDiagnosis(userId, { name, next_steps: nextSteps, notes }).then(r  => {
            props.navigation.goBack(); // Go back to the previous screen after recording diagnosis
        });

        clearInputs(); // Clear input fields after recording diagnosis
    };
    return (
      <View style={styles.mainContainer}>
          {/* Header */}
          <Header title='Record'/>
          {/* Title for recording diagnosis */}
          <Text style={styles.header}>Record Diagnosis</Text>
          <View style={styles.regularText}>
              {/* Input field for diagnosis name */}
              <Text>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
              {/* Input field for next steps */}
              <Text>Next Steps</Text>
              <TextInput
                style={styles.input}
                value={nextSteps}
                onChangeText={setNextSteps}
              />
              {/* Input field for notes */}
              <Text>Notes</Text>
              <TextInput
                style={styles.notesInput}
                value={notes}
                onChangeText={setNotes}
                multiline={true}
              />
              {/* Continue button */}
              <View style={styles.buttonContainer}>
                  <CustomButton onPress={handleSubmit}>Continue</CustomButton>
              </View>
          </View>
      </View>
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
        flex: 1,
    },

    input: {
        width: '90%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
    },

    notesInput: {
        width: '90%',
        height: 120, // Adjust the height as needed
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
    },

    buttonContainer: {
        marginTop: "50%",
    }
});
