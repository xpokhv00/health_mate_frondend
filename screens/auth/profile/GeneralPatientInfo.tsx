import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from 'react-native-paper';
import { IUserInfo } from "../../../types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import user from "../../../api/user.service";
import {Formik} from "formik";
import jwt_decode from "jwt-decode";
import { Header } from "../../../components/Header";
import CustomButton from "../../../components/CustomButton";

export function GeneralPatientInfo(props: any) {
  const {navigation} = props;
  const {identity} = props.route.params;
  const [gender, setGender] = useState('female');
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState('18');
  const [preconditions, setPreconditions] = useState<Array<any>>([]);
  const [allergies, setAllergies] = useState<string[]>([]);

  const load = async () => {
    return await AsyncStorage.getItem("tokens")
  }

  useEffect(() => {
    load().then((tokens) => {
    })
  }, []);

  const handleMainSubmit = async () => {
    // Instead of using localStorage, you might want to use AsyncStorage in a real React Native project.
    // For this example, we'll keep it simple using localStorage.
    // Import AsyncStorage from 'react-native' and use it for data storage.

    // Construct the dataUserInfo object
    let dataUserInfo: IUserInfo = {
      // age: parseInt(localStorage.getItem('age') || '0', 10),
      //TODO: calculate age from the current date - getItem('age')
      age: parseInt(age), // Sample age
      gender: gender || '',
      height: parseInt(height),
      weight: parseInt(weight),
      user: identity.user_id.toString(),
      name: firstname + " " + lastname,
      preconditions: JSON.stringify(preconditions),
      allergies: JSON.stringify(allergies), // Store allergies as a JSON string
    }
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

  const handleConfirmPrecondition = (precondition: string) => {
    setPreconditions([...preconditions, precondition]);
  };

  const handleConfirmAllergy = (allergy: string) => {
    setAllergies([...allergies, allergy]);
  };

  return <ScrollView>
    <Header title={"General information"}/>
    <Formik initialValues={{age: '', gender: '', height: '', weight: '', firstname: '', lastname: '', allergy: "", precondition: ""}}
            onSubmit={values => {
              setGender(values.gender)
              setAge(values.age)
              setHeight(values.height)
              setWeight(values.weight)
              setFirstname(values.firstname)
              setLastname(values.lastname)
            }}>
      {({handleChange, setFieldValue, handleBlur, handleSubmit, values}) => <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10, }}>General Information</Text>
        <View style={{ flexDirection: "row", paddingHorizontal: 20, paddingTop: 5 }}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <Text style={styles.regularText}>First name</Text>
            <TextInput
              style={{ borderColor: "gray", borderWidth: 1, padding: 10, borderRadius: 8 }}
              onChangeText={nextValue => {
                setFieldValue("firstname", nextValue)
                setFirstname(nextValue)
                // setFirstname(firstname)
              }}
              value={values.firstname}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text style={styles.regularText}>Last name</Text>
            <TextInput
              style={{ borderColor: "gray", borderWidth: 1, padding: 10, borderRadius: 8 }}
              onChangeText={nextValue => {
                setFieldValue("lastname", nextValue)
                setLastname(nextValue)
                // setLastname(nextValue)
              }}
              value={values.lastname}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", paddingHorizontal: 20, paddingTop: 5 }}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <Text style={styles.regularText}>Gender</Text>
            <TextInput
              style={{ borderColor: "gray", borderWidth: 1, padding: 10, borderRadius: 8 }}
              onChangeText={nextValue => {
                setFieldValue("gender", nextValue)
                setGender(nextValue)
                // setGender(nextValue)
              }}
              value={values.gender}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text style={styles.regularText}>Age</Text>
            <TextInput
              style={{ borderColor: "gray", borderWidth: 1, padding: 10, borderRadius: 8 }}
              onChangeText={nextValue => {
                setFieldValue("age", nextValue)
                setAge(nextValue)
                // setAge(nextValue)
              }}
              keyboardType="numeric"
              value={values.age}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", paddingHorizontal: 20, paddingTop: 5 }}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <Text style={styles.regularText}>Height (in cm)</Text>
            <TextInput
              style={{ borderColor: "gray", borderWidth: 1, padding: 10, borderRadius: 8 }}
              onChangeText={ (nextValue) => {
                setFieldValue("height", nextValue)
                setHeight(nextValue)
                // setHeight(nextValue)
              }}
              value={values.height}
              keyboardType="numeric"
            />
          </View>
          <View style={{ flex: 1, marginRight: 5 }}>
            <Text style={styles.regularText}>Weight (in kg)</Text>
            <TextInput
              style={{ borderColor: "gray", borderWidth: 1, padding: 10, borderRadius: 8 }}
              onChangeText={nextValue => {
                setFieldValue("weight", nextValue)
                setWeight(nextValue)
                // setWeight(nextValue)
              }}
              value={values.weight}
              keyboardType="numeric"
            />
          </View>
        </View>


        {/* Precondition */}
        <View style={styles.inputContainer}>
          <Text style={styles.regularText}>Precondition</Text>
          <Text style={styles.inputText}>
            {preconditions.length === 0 ? "Select precondition" : preconditions.join(", ")}
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('precondition')}
            value={values.precondition}
          />
          <View style={styles.buttonContainer}>
            <CustomButton onPress={() => {
              handleConfirmPrecondition(values.precondition);
              values.precondition = '';
            }}>Add</CustomButton>
            <CustomButton onPress={() => setPreconditions([])}>Clear</CustomButton>
          </View>
        </View>

        {/* Allergies */}
        <View style={styles.inputContainer}>
          <Text style={styles.regularText}>Allergies</Text>
          <Text style={styles.inputText}>
            {allergies.length === 0 ? "Select allergy" : allergies.join(", ")}
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('allergy')}
            value={values.allergy}
          />
          <View style={styles.buttonContainer}>
            <CustomButton onPress={() => {
              handleConfirmAllergy(values.allergy);
              values.allergy = '';
            }}>Add</CustomButton>
            <CustomButton onPress={() => setAllergies([])}>Clear</CustomButton>
          </View>
        </View>

        <View style={{width: "90%", justifyContent: "center", alignItems: "center"}}>
          <CustomButton  onPress={()=> {
            handleMainSubmit()
          } } >Continue</CustomButton>
        </View>
      </View>}</Formik></ScrollView>
}


const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  inputText: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    width: "45%",
  },
  diagnosisContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#F5F5F5",
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  diagnosisHeader: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  diagnosisHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  diagnosisDetails: {
    padding: 10,
  },
  diagnosisText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#555", // Adjust text color as needed
  },
  regularText: {
    fontSize: 16,
    paddingVertical: 10,
  }
});
