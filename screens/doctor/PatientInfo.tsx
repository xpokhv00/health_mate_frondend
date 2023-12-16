import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header } from "../../components/Header";
import { Button } from "react-native-paper";
import CustomButton from "../../components/CustomButton";

export function PatientInfo(props: any) {
    const { navigation } = props;
    const { patient_info } = props.route.params;
    const [allergies, setAllergies] = useState<string[]>([]);
    const [preconditions, setPreconditions] = useState<string[]>([]);

    useEffect(() => {
        // Parse and set allergies and preconditions from patient_info
        if (patient_info.profile.allergies) {
            const allergiesArray = JSON.parse(patient_info.profile.allergies);
            setAllergies(allergiesArray);
        }

        if (patient_info.profile.preconditions) {
            const preconditionsArray = JSON.parse(patient_info.profile.preconditions);
            setPreconditions(preconditionsArray);
        }
    }, []);

    {/* Display basic information */}
    {/* Display patient's name, age, gender, height, weight */}
    {/* Display allergies and preconditions */}
    {/* Map through allergies and preconditions */}
    {/* Show buttons to prescribe medicine, record diagnosis, make an appointment, and end interaction */}
    return (
      <ScrollView style={styles.container}>
          <Header title={"Patient Info"} />
          <View style={styles.infoContainer}>
              <Text style={styles.heading}>Information</Text>
              <View style={styles.infoSection}>
                  <Text style={styles.label}>Name:</Text>
                  <Text style={styles.value}>{patient_info.profile.name}</Text>
              </View>
              <View style={styles.infoSection}>
                  <Text style={styles.label}>Age:</Text>
                  <Text style={styles.value}>{patient_info.profile.age}</Text>
              </View>
              <View style={styles.infoSection}>
                  <Text style={styles.label}>Gender:</Text>
                  <Text style={styles.value}>{patient_info.profile.gender}</Text>
              </View>
              <View style={styles.infoSection}>
                  <Text style={styles.label}>Height:</Text>
                  <Text style={styles.value}>{patient_info.profile.height} cm</Text>
              </View>
              <View style={styles.infoSection}>
                  <Text style={styles.label}>Weight:</Text>
                  <Text style={styles.value}>{patient_info.profile.weight} kg</Text>
              </View>

              <View style={styles.section}>
                  <Text style={styles.heading}>Allergies:</Text>
                  {allergies.map((al: string, index: number) => (
                    <View key={index} style={styles.listItem}>
                        <Text>{al}</Text>
                    </View>
                  ))}
              </View>

              <View style={styles.section}>
                  <Text style={styles.heading}>Preconditions:</Text>
                  <FlatList
                    data={preconditions}
                    renderItem={({ item }) => <View style={styles.listItem}><Text>{item}</Text></View>}
                    keyExtractor={(item, index) => index.toString()}
                  />
              </View>

              <View style={styles.buttonContainer}>
                  <CustomButton
                    onPress={() => {
                        navigation.navigate('PrescribeMedicine', { userId: patient_info.id});
                    }}
                  >
                      Medicine
                  </CustomButton>
                  <CustomButton
                    onPress={() => {
                        navigation.navigate('RecordDiagnosis', { userId: patient_info.id});
                    }}
                  >
                      Diagnosis
                  </CustomButton>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
                  <CustomButton
                    onPress={() => {
                        navigation.navigate('MakeAppointment', { userId: patient_info.id});
                    }}
                  >
                      Appointment
                  </CustomButton>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
                  <CustomButton
                    onPress={() => {
                        navigation.navigate('DoctorMain');
                    }}
                  >
                      End Interaction
                  </CustomButton>
              </View>
          </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    infoContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    section: {
        marginBottom: 10,
        width: '100%',
    },
    listItem: {
        paddingVertical: 15,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        width: '50%',
    },
    button: {
        width: "45%",
        marginVertical: 10,
        backgroundColor: 'lightgreen',
    },

    infoSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        width: '100%',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    value: {
        fontSize: 16,
    },
});
