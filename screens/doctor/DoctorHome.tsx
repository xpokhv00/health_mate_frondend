import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import calendar from "../../assets/calendar.png";
import { Header } from "../../components/Header";
import user from "../../api/user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import {
  getAppointmentsThunk,
  getDoctorsThunk,
  getMedicationsThunk,
  getPatientsThunk
} from "../../store/slices/info-slice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import CustomButton from "../../components/CustomButton";

// Get current date details
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

export function DoctorHome(props: any) {
  const [userInfo, setUserInfo] = useState({ profile: { name: "John" } });
  const appointments = useAppSelector((state) => state.Info.appointments);
  const [identity, setIdentity] = useState<any>();
  const patients: any = useAppSelector((state) => state.Info.patients);

  const dispatch = useAppDispatch();

  // Function to load necessary data on component mount
  const load = async () => {
    // Dispatch actions to get data from the store
    dispatch(getMedicationsThunk());
    dispatch(getDoctorsThunk());
    dispatch(getPatientsThunk());

    // Retrieve tokens from AsyncStorage
    const tokens = await AsyncStorage.getItem("tokens");
    if (tokens != null) {
      // Decode access token to get user identity
      const parsedTokens = JSON.parse(tokens);
      const identity: { doctor: boolean, user_id: string } = parsedTokens && jwt_decode(parsedTokens.access);

      // Dispatch action to get appointments based on user id
      dispatch(getAppointmentsThunk(identity.user_id));

      // Set user identity and retrieve user information
      setIdentity(identity);
      user.getInfoByUserId(identity.user_id).then(r => {
        setUserInfo(r);
      }).catch((e) => {
        // Redirect to authentication if user info is not fetched
        props.navigation.navigate("AuthType");
        AsyncStorage.removeItem("tokens");
      });
    }
  };

  useEffect(() => {
    // Call load function on component mount
    load();
  }, []);

  // Function to delete an appointment
  const handleDeleteAppointment = (appointmentId: string) => {
    user.deleteAppointment(appointmentId).then(r => {
      dispatch(getAppointmentsThunk(identity.user_id));
    });
  };

  // Function to handle user logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem("tokens")
    props.navigation.navigate("AuthType")
  };

  // Rendering UI components
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <Header title={"Home"} />

      {/* Logout button */}
      <TouchableOpacity onPress={handleLogout} style={{ position: "absolute", top: 17, right: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>Logout</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Greeting */}
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#333" }}>
          Hi, Dr. {userInfo.profile.name}
        </Text>

        {/* Displaying appointments */}
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5, color: "#555" }}>
          Your Next Appointments
        </Text>

        {/* Display today's date */}
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
          <Image source={calendar} style={{ width: 20, height: 20, marginRight: 8 }} />
          <Text style={{ fontSize: 16 }}>{day}.{month}.{year}</Text>
        </View>

        {/* Display appointments */}
        <View style={{ marginTop: 15 }}>
          {/* Check if appointments exist */}
          {appointments?.length > 0 ? (
            appointments.map((a: any, index: number) => {
              // Function to extract hours and minutes from time string
              const extractHoursMinutes = (timeString: string) => {
                const [hours, minutes] = timeString.split(":").slice(0, 2);
                return `${hours}:${minutes}`;
              };

              return (
                <View
                  key={index}
                  style={{
                    padding: 20,
                    backgroundColor: "#F6F6F6",
                    width: "90%",
                    borderRadius: 20,
                    marginTop: 15,
                    marginHorizontal: 15,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  {/* Display appointment details */}
                  <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "center", }}>
                    <View>
                      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
                        {a.title}
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity onPress={() => handleDeleteAppointment(a.id)}>
                        <Text style={{ color: 'red', marginBottom: "100%"}}>X</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                    <Text style={{ fontSize: 14 }}>
                      From {extractHoursMinutes(a.timeFrom)} to {extractHoursMinutes(a.timeTo)}
                    </Text>
                    <Text style={{ fontSize: 14 }}>
                      Patient:{" "}
                      {patients?.find((p: { id: number; profile: any }) => p.id === a.patient)?.profile?.name || "Unknown"}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 14 }}>
                    Date:{" "} {a.date}
                  </Text>
                </View>
              );
            })
          ) : (
            <View>
              <Text>You have no appointments</Text>
            </View>
          )}
        </View>

        {/* Button to navigate to DoctorQRcode */}
        <View style={{justifyContent: "center", alignItems: "center"}}>
          <CustomButton onPress={() => {props.navigation.navigate("DoctorQRcode")}}>Scan QrCode</CustomButton>
        </View>
      </ScrollView>
    </View>
  );
}
