import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Switch } from "react-native";
import PieChart from "react-native-pie-chart";
import calendar from "../../assets/calendar.png";
import { Header } from "../../components/Header";
import user from "../../api/user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { getDoctorsThunk, getMedicationsThunk } from "../../store/slices/info-slice";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Button } from "react-native-paper";

const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

const returnNearestMedicationTime = (medication: any) => {
  const times = medication.times;
  const currentTime = new Date();
  let nearestTime = null;
  let smallestDifference: any = null;
  let nearestIndex = -1;

  times.forEach((timeObject: any, index: any) => {
    if (timeObject.taken) {
      return; // Skip this time and continue with the next iteration
    }

    const medicationTime = new Date(timeObject.time);
    const timeDifference = Math.abs(currentTime.getTime() - medicationTime.getTime());

    if (smallestDifference === null || timeDifference < smallestDifference) {
      smallestDifference = timeDifference;
      nearestTime = timeObject.time;
      nearestIndex = index;
    }
  });

  if (nearestTime === null) {
    return { timeString: null, index: -1 };
  }

  return { timeString: nearestTime, index: nearestIndex };
};

const returnLatestTaken = (medication: any) => {
  for (let i = medication.times.length - 1; i >= 0; i--) {
    if (medication.times[i].taken) {
      return medication.times[i].time;
    }
  }
  return null;
};

function calculateMedicationTakenPercentage(medications: any) {
  let totalMedications = 0;
  let medicationsTaken = 0;

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();


  medications.forEach((medication: any) => {
    medication.times.forEach((timeObject: any) => {
      const [hour, minute] = timeObject.time.split(":").map(Number);

      if (hour < currentHour || (hour === currentHour && minute <= currentMinute)) {
        totalMedications++;

        if (timeObject.taken) {
          medicationsTaken++;
        }
      }
    });
  });

  if (totalMedications === 0) {
    return 0; // Avoid division by zero
  }

  const percentageTaken = (medicationsTaken / totalMedications) * 100;
  return Math.round(percentageTaken);
}

export function DoctorHome(props: any) {
  const [userInfo, setUserInfo] = useState({profile: {name: "John"}});
  const Medications = useAppSelector((state) => state.Info.medications);
  const [treatments, setTreatments] = useState<any>([])



  const widthAndHeight = 100;
  const series = [123, 321, 123, 789, 537];
  const sliceColor = ["rgba(0,0,0,0)", "#ffb300", "#ff9100", "#ff6c00", "#ff3c00"];

  useEffect(() => {

    treatments.forEach((medication: { times: any[]; }, index: any) => {
      medication.times.forEach((timeObject, i) => {
        if (!timeObject.taken) {
          const [hour, minute] = timeObject.time.split(":").map(Number);
        }
      });
    });
  }, [treatments]);
  //
  useEffect(() => {
    const percent = calculateMedicationTakenPercentage(treatments);
    setPercentageTaken(percent);
  }, [treatments]);

  const dispatch = useAppDispatch();

  const load = async () => {
    dispatch(getMedicationsThunk());
    dispatch(getDoctorsThunk());
    const tokens = await AsyncStorage.getItem("tokens");
    if (tokens != null) {
      const parsedTokens = JSON.parse(tokens);
      const identity: { doctor: boolean, user_id: string } = parsedTokens && jwt_decode(parsedTokens.access);
      let data = await user.getTreatments()
      data = data.map((treat: any) => {
        console.log(treat.times, "TIMES");
        return {...treat, times: JSON.parse(treat.times)}
      })
      console.log("Data, ", data);
      setTreatments(data)
      user.getInfoByUserId(identity.user_id).then(r => {
        console.log("DATA FOR USER INFO, ", r);
        setUserInfo(r);
      }).catch((e) => {
        props.navigation.navigate("AuthType");
        AsyncStorage.removeItem("tokens");
      });
    }
  };
  //
  const [percentageTaken, setPercentageTaken] = useState(0);
  //
  useEffect(() => {
    load();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header title={"Home"} />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
          Hi there 👋{userInfo.profile.name}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 12 }}>

        </View>
        <Text style={{ fontSize: 14 }}>You have already taken {percentageTaken}% of your medication that is due</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>Today's medication</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={calendar} style={{ width: 20, height: 20 }} />
          <Text style={{ marginLeft: 8 }}>{day}.{month}.{year}</Text>
        </View>
        <View>
        </View>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>Already taken</Text>
        <View>

        </View>
      </ScrollView>
    </View>
  );


}
