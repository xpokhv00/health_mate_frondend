import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from 'react-native-paper';
import { IUserInfo } from "../../../types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import user from "../../../api/user.service";
import {Formik} from "formik";
import jwt_decode from "jwt-decode";

export function Gender(props: any) {
  const {navigation} = props;
  const [gender, setGender] = useState('female');
  const [step, setStep] = useState(0)
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

  const handleFirstname = (text: any) => {
    setFirstname(text);
  };

  const handleLastname = (text: any) => {
    setLastname(text);
  };

  const handleHeight = (text: any) => {
    setHeight(text);
  };

  const handleWeight = (text: any) => {
    setWeight(text);
  };


  const Content = () => {
    switch (step) {
      case 0:
        return <Formik initialValues={{age: '', gender: '', height: '', weight: '', firstname: '', lastname: ''}}
                          onSubmit={values => {
                            setGender(values.gender)
                            setAge(values.age)
                            setHeight(values.height)
                            setWeight(values.weight)
                            setFirstname(values.firstname)
                            setLastname(values.lastname)
                          }}>
          {({handleChange, setFieldValue, handleBlur, handleSubmit, values}) => <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>General Information</Text>
          <View style={{ flexDirection: "row", padding: 20 }}>
            <View style={{ flex: 1, marginRight: 5 }}>
              <Text style={{ fontSize: 16 }}>First name</Text>
              <TextInput
                style={{ borderColor: "gray", borderWidth: 1, padding: 10, borderRadius: 8 }}
                onChangeText={nextValue => {
                  setFieldValue("firstname", nextValue)
                  // setFirstname(firstname)
                }}
                value={values.firstname}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 5 }}>
              <Text style={{ fontSize: 16 }}>Last name</Text>
              <TextInput
                style={{ borderColor: "gray", borderWidth: 1, padding: 10, borderRadius: 8 }}
                onChangeText={nextValue => {
                  setFieldValue("lastname", nextValue)
                  // setLastname(nextValue)
                }}
                value={values.lastname}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", padding: 20 }}>
            <View style={{ flex: 1, marginRight: 5 }}>
              <Text style={{ fontSize: 16 }}>Gender</Text>
              <TextInput
                style={{ borderColor: "gray", borderWidth: 1, padding: 10, borderRadius: 8 }}
                onChangeText={nextValue => {
                  setFieldValue("gender", nextValue)
                  // setGender(nextValue)
                }}
                value={values.gender}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 5 }}>
              <Text style={{ fontSize: 16 }}>Age</Text>
              <TextInput
                style={{ borderColor: "gray", borderWidth: 1, padding: 10, borderRadius: 8 }}
                onChangeText={nextValue => {
                  setFieldValue("age", nextValue)
                  // setAge(nextValue)
                }}
                keyboardType="numeric"
                value={values.age}
              />
            </View>
          </View>

          <View style={{ flexDirection: "row", padding: 20 }}>
            <View style={{ flex: 1, marginRight: 5 }}>
              <Text style={{ fontSize: 16 }}>Height (in cm)</Text>
              <TextInput
                style={{ borderColor: "gray", borderWidth: 1, padding: 10, borderRadius: 8 }}
                onChangeText={ (nextValue) => {
                  setFieldValue("height", nextValue)
                  // setHeight(nextValue)
              }}
                value={values.height}
                keyboardType="numeric"
              />
            </View>
            <View style={{ flex: 1, marginRight: 5 }}>
              <Text style={{ fontSize: 16 }}>Weight (in kg)</Text>
              <TextInput
                style={{ borderColor: "gray", borderWidth: 1, padding: 10, borderRadius: 8 }}
                onChangeText={nextValue => {
                  setFieldValue("weight", nextValue)
                  // setWeight(nextValue)
                }}
                value={values.weight}
                keyboardType="numeric"
              />
            </View>
          </View>
          <Button  onPress={()=> {
            handleSubmit()
            handleNext()
          } } >Continue</Button>
        </View>}</Formik>
      case 1:
        return <Formik initialValues={{precondition: ''}}
                       onSubmit={values => {
                       }}>
          {({handleChange, setFieldValue, handleBlur, handleSubmit, values}) => <View style={{  alignItems: "center", justifyContent: "center" }}>
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
            value={values.precondition}
            onChangeText={(text) => {
              setFieldValue("precondition", text)
            }}
            style={{ borderColor: 'gray', borderWidth: 1, padding: 10, margin: 10, borderRadius: 8, width: 250 }}
          />

          <Button onPress={() => {
            setPreconditions([...preconditions, values.precondition])
          }} >Add</Button>

          <Button onPress={handleNext} >Continue</Button>
        </View>}</Formik>
      case 2:
        return <Formik initialValues={{allergy: ''}}
                       onSubmit={values => {
                         // TODO
                       }}>
          {({handleChange, setFieldValue, handleBlur, handleSubmit, values}) => <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}} >
          <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 20 }}>Add Allergie</Text>
            <FlatList
              data={allergies}
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
              value={values.allergy}
              onChangeText={(text) => {
                setFieldValue("allergy", text)
              }}
              style={{ borderColor: 'gray', borderWidth: 1, padding: 10, margin: 10, borderRadius: 8, width: 250 }}
            />
          <Button  onPress={() => {
            setAllergies([...allergies, values.allergy])
          }} >Add</Button>
          <Button onPress={handleMainSubmit} >Continue</Button>
        </View>}</Formik>
    }

  }

  const handleGenderChange = (selectedGender: any) => {
    setGender(selectedGender);
  };

  const handleNext = () => {
    // Replace localStorage with AsyncStorage or any other storage mechanism.
    // For this example, we'll keep it simple using console.log.
    // AsyncStorage.setItem("gender", gender);

    // navigation.navigate("Birthday");
    setStep((step) => step+1)
  };

  return <Content/>
}
