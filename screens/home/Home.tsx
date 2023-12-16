import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Switch, TouchableOpacity } from "react-native";
import PieChart from "react-native-pie-chart";
import calendar from "../../assets/calendar.png";
import { Header } from "../../components/Header";
import user from "../../api/user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { getDoctorsThunk, getMedicationsThunk, set_user_info } from "../../store/slices/info-slice";
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

export function Home(props: any) {
  const [userInfo, setUserInfo] = useState({profile: {name: "John"}});
  const Medications = useAppSelector((state) => state.Info.medications);
  const [treatments, setTreatments] = useState<any>([])
  const [appointments, setAppointments] = useState<any>([])
  const doctors = useAppSelector((state) => state.Info.doctors)

const countTreatments = (treatments: any) => {
  let takenCount = 0;
  let notTakenCount = 0;

// Loop through treatments
  for (let i = 0; i < treatments.length; i++) {
    let times = treatments[i].times;

    // Loop through times for each treatment
    for (let j = 0; j < times.length; j++) {
      if (times[j].taken) {
        takenCount++;
      } else {
        notTakenCount++;
      }
    }
  }

  return [notTakenCount * 100 || 0.1, takenCount * 100 || 0.1]
}

  const widthAndHeight = 100;
  const series = countTreatments(treatments);
  const sliceColor = ["rgba(0,0,0,0)", "#ffb300"];

  // UseEffects for component lifecycle and data loading
  useEffect(() => {

    treatments.forEach((medication: { times: any[]; }, index: any) => {
      medication.times.forEach((timeObject, i) => {
        if (!timeObject.taken) {
          const [hour, minute] = timeObject.time.split(":").map(Number);
        }
      });
    });
  }, [treatments]);

  // UseEffects for component lifecycle and data loading
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
      const response = await user.getAppointmentsByPatientId(identity.user_id)
      setAppointments(response.appointments)
      data = data.map((treat: any) => {
        console.log(treat.times, "TIMES");
        return {...treat, times: JSON.parse(treat.times)}
      })
      console.log("Data, ", data);
      setTreatments(data)
      user.getInfoByUserId(identity.user_id).then(r => {
        console.log("DATA FOR USER INFO, ", r);
        setUserInfo(r);
        dispatch(set_user_info(r))
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

  // Logout function
  const handleLogout = async () => {
    // Code logic for handling logout
    await AsyncStorage.removeItem("tokens")
    props.navigation.navigate("AuthType")
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title={"Home"} />
      <TouchableOpacity onPress={handleLogout} style={{ position: "absolute", top: 17, right: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>Logout</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
          Hi there 👋{userInfo.profile.name}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", margin: 20 }}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.65}
            coverFill={"#FFF"}
          />
        </View>
        <Text style={{ fontSize: 14 }}>You have already taken {percentageTaken}% of your medication that is due</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>Today's medication</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={calendar} style={{ width: 20, height: 20 }} />
          <Text style={{ marginLeft: 8 }}>{day}.{month}.{year}</Text>
        </View>
        <View>
          {treatments.map((medication: { medication: string, name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; dosage: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; times: { taken: boolean | undefined; }[]; }, index: number) => {
            const nearestTime = returnNearestMedicationTime(medication);
            return (
              <View key={index} style={{ marginTop: 20 }}>
                {nearestTime.timeString != null && (
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{nearestTime.timeString}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        backgroundColor: "rgba(97,224,132, 0.7)",
                        padding: 10,
                        borderRadius: 8,
                        marginTop: 5
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{medication.name}</Text>
                        <Text>{medication.dosage} tablet per dose</Text>
                        <Text>{Medications.filter((med: any) => med.id == medication.medication)[0]?.name}</Text>
                      </View>
                      <Button color="black" value={medication.times[nearestTime.index].taken} onPress={(value) => {
                        if (nearestTime.index !== -1) {
                          const updatedData = [...treatments];
                          updatedData[index].times[nearestTime.index].taken = true;
                          console.log("NEW TREATMENT DATA, ", updatedData[index]);
                          setTreatments(updatedData);
                          user.putTreatments(updatedData[index].id, {...updatedData[index], times: JSON.stringify(updatedData[index].times)})
                        }
                      }}>Take</Button>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>Already taken</Text>
        <View>
          {treatments.map((medication: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; dosage: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => {
            const latestTaken = returnLatestTaken(medication);
            return (
              <View key={index} style={{ marginTop: 20 }}>
                {latestTaken && (
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {`${latestTaken}`}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        backgroundColor: "rgba(97,224,132,0.26)",
                        padding: 10,
                        borderRadius: 8,
                        marginTop: 5
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{medication.name}</Text>
                        <Text>{medication.dosage} tablet per dose</Text>
                        <Text>{Medications.filter((med: any) => med.id == medication.medication)[0]?.name}</Text>
                      </View>
                      <Switch
                        value={false}
                        disabled
                        thumbColor="transparent"
                      />
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>Appointments</Text>
        <View style={{ marginTop: 15 }}>
          {appointments.length > 0 ? (
            appointments.map((a: any, index: number) => {
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
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {a.title}
                  </Text>
                  <View>
                    <Text style={{ fontSize: 14 }}>
                      From {extractHoursMinutes(a.timeFrom)} to {extractHoursMinutes(a.timeTo)}
                    </Text>
                    <Text style={{ fontSize: 14 }}>
                      Date:{" "} {a.date}
                    </Text>
                    <Text style={{ fontSize: 14 }}>
                      Doctor:{" "}
                      {doctors?.find((p: { id: number; profile: any }) => p.id === a.doctor)?.profile?.name || "Unknown"}
                    </Text>
                    <Text style={{ fontSize: 14 }}>
                      Phone:{" "} {a.phone}
                    </Text>
                    <Text style={{ fontSize: 14 }}>
                      Address:{" "}
                      {doctors?.find((p: { id: number; profile: any }) => p.id === a.doctor)?.profile?.address || "Unknown"}
                    </Text>
                  </View>
                </View>
              );
            })
          ) : (
            <View>
              <Text>You have no appointments</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );


}
