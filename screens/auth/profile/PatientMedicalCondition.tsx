// Importing necessary modules and components from React Native and other libraries
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Header } from "../../../components/Header";
import { IUserInfo } from "../../../types/User";
import user from "../../../api/user.service";
import { Formik } from "formik";
import CustomButton from "../../../components/CustomButton";

// Functional component for managing patient medical conditions

export const PatientMedicalCondition = (props: any) => {

  const [diagnosis, setDiagnosis] = useState<Array<{ name: string, next_steps: string, notes: string }>>();
  const [userInfo, setUserInfo] = useState<{
    age: number,
    id: string,
    gender: string,
    height: number,
    weight: number,
    name: string,
    preconditions: string,
    allergies: string
  }>();
  const { navigation } = props;
  const { identity } = props.route.params;
  const [gender, setGender] = useState<any>(userInfo?.gender);
  const [height, setHeight] = useState<any>(userInfo?.height);
  const [weight, setWeight] = useState<any>(userInfo?.weight);
  const [age, setAge] = useState<any>(userInfo?.age);
  const [preconditions, setPreconditions] = useState<string[]>(userInfo?.preconditions ? JSON.parse(userInfo.preconditions) : []);
  const [allergies, setAllergies] = useState<string[]>(userInfo?.allergies ? JSON.parse(userInfo.allergies) : []);

  useEffect(() => {
    user.getInfoByUserId(identity.user_id).then(data => {
      setUserInfo(data.profile)
      console.log(data.profile);
    })
    user.getDiagnosis().then(data => {
      setDiagnosis(data)
    })
  }, []);

  const handleConfirmPrecondition = (precondition: string) => {
    setPreconditions([...preconditions, precondition]);
  };

  const handleConfirmAllergy = (allergy: string) => {
    setAllergies([...allergies, allergy]);
  };

  const handleMainSubmit = async () => {

    // Construct the dataUserInfo object
    let dataUserInfo: IUserInfo = {
      age: parseInt(age) || userInfo?.age, // Sample age
      gender: gender || userInfo?.gender,
      height: parseInt(height) || userInfo?.height,
      weight: parseInt(weight) || userInfo?.weight,
      user: identity.user_id,
      name: userInfo?.name,
      preconditions: JSON.stringify(preconditions) || userInfo?.preconditions,
      allergies: JSON.stringify(allergies) || userInfo?.allergies // Store allergies as a JSON string
    };
    console.log(dataUserInfo);

    // Replace the user.postInfo with your API call
    // For simplicity, we're using a placeholder 'postInfo' function here.
    user.putInfo(userInfo.id, dataUserInfo)
      .then((response: any) => {
        console.log(response);
        navigation.navigate("Home"); // Navigate to the Home screen
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return <View>
    <Header title={"Medical Condition"} />
    <ScrollView>
      <Formik
        initialValues={{
          age: userInfo?.age.toString(),
          gender: userInfo?.gender,
          height: userInfo?.height.toString(),
          weight: userInfo?.weight.toString(),
          precondition: '',
          allergy: ''
        }}
        onSubmit={values => {
          setGender(values.gender);
          setAge(values.age);
          setHeight(values.height);
          setWeight(values.weight);
          handleMainSubmit();
        }}
      >
        {({ handleChange, setFieldValue, handleSubmit, values }) => (
          <View style={{ padding: 20 }}>
            <View style={{ flexDirection: "row" }}>
              {/* Gender */}
              <View style={{ flex: 1, marginRight: 5 }}>
                <Text style={{ fontSize: 16 }}>Gender</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(nextValue) => {
                    setFieldValue("gender", nextValue)
                    setGender(nextValue)
                  }}
                  placeholder={userInfo?.gender}
                  value={values.gender}
                />
              </View>
              {/* Age */}
              <View style={{ flex: 1, marginLeft: 5 }}>
                <Text style={{ fontSize: 16 }}>Age</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(nextValue) => {
                    setFieldValue("age", nextValue)
                    setAge(nextValue)
                  }}
                  placeholder={userInfo?.age.toString()}
                  keyboardType="numeric"
                  value={values.age}
                />
              </View>
            </View>

            {/* Height & Weight */}
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              {/* Height */}
              <View style={{ flex: 1, marginRight: 5 }}>
                <Text style={{ fontSize: 16 }}>Height (in cm)</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(nextValue) => {
                    setFieldValue("height", nextValue)
                    setHeight(nextValue)
                  }}
                  placeholder={userInfo?.height.toString()}
                  keyboardType="numeric"
                  value={values.height}
                />
              </View>
              {/* Weight */}
              <View style={{ flex: 1, marginRight: 5 }}>
                <Text style={{ fontSize: 16 }}>Weight (in kg)</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(nextValue) => {
                    setFieldValue("weight", nextValue)
                    setWeight(nextValue)
                  }}
                  placeholder={userInfo?.weight.toString()}
                  keyboardType="numeric"
                  value={values.weight}
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
                <CustomButton onPress={() => setDiagnosis([])}>Clear</CustomButton>
              </View>
            </View>

            {/* Save Button */}
            <View style={{alignItems: "center", justifyContent: "center"}}>
              <CustomButton onPress={handleSubmit}>Save</CustomButton>
            </View>
          </View>
        )}
      </Formik>
      {/* Diagnosis */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Diagnosis</Text>
        {diagnosis?.map((item, index) => (
          <View key={index} style={styles.diagnosisContainer}>
            <View style={styles.diagnosisHeader}>
              <Text style={styles.diagnosisHeaderText}>Name: {item.name}</Text>
            </View>
            <View style={styles.diagnosisDetails}>
              <Text style={styles.diagnosisText}>Next Steps: {item.next_steps}</Text>
              <Text style={styles.diagnosisText}>Notes: {item.notes}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={{height: 50}}/>
    </ScrollView>
  </View>
};

// Stylesheet for styling components
const styles = StyleSheet.create({
  // Style definitions for various components and containers
  inputContainer: {
    marginTop: 10,
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
    padding: 15,
    borderRadius: 8,
    marginBottom: 5,
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "52%"
  },
  diagnosisContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
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
    backgroundColor: "lightgreen",
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
