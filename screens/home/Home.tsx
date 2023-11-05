import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Switch } from "react-native";
import PieChart from "react-native-pie-chart";
import calendar from '../../assets/calendar.png'
import { Header } from "../../components/Header";

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

export function Home() {
  const [data, setData] = useState([
    {
      name: "Medication A",
      value: 10,
      dosage: "80mg",
      times: [
        { time: "8:00", taken: false },
        { time: "12:30", taken: false },
        { time: "16:00", taken: false },
        { time: "22:11", taken: false },
        { time: "22:12", taken: false },
        { time: "22:13", taken: false }
      ]
    },
    {
      name: "Medication B",
      value: 10,
      dosage: "200mg",
      times: [
        { time: "8:00", taken: false },
        { time: "20:00", taken: false }
      ]
    }
  ]);

  const widthAndHeight = 100
  const series = [123, 321, 123, 789, 537]
  const sliceColor = ['rgba(0,0,0,0)', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00']

  //
  const [percentageTaken, setPercentageTaken] = useState(0);
  //
  useEffect(() => {

    data.forEach((medication, index) => {
      medication.times.forEach((timeObject, i) => {
        if (!timeObject.taken) {
          const [hour, minute] = timeObject.time.split(":").map(Number);
        }
      });
    });
  }, [data]);
  //
  useEffect(() => {
    const percent = calculateMedicationTakenPercentage(data);
    setPercentageTaken(percent);
  }, [data]);

  return (
    <View style={{ flex: 1 }}>
      <Header title={"Home"}/>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
          Hi there 👋
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 12 }}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.65}
            coverFill={'#FFF'}
          />

          {/*<Text>*/}
          {/*  {percentageTaken}%*/}
          {/*</Text>*/}
        </View>
        <Text style={{ fontSize: 14 }}>You have already taken {percentageTaken}% of your medication that is due</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>Today's medication</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={calendar} style={{ width: 20, height: 20 }} />
          <Text style={{ marginLeft: 8 }}>{day}.{month}.{year}</Text>
        </View>
        <View>
          {data.map((medication, index) => {
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
                        <Text>{medication.dosage}</Text>
                      </View>
                      <Switch
                        value={medication.times[nearestTime.index].taken}
                        onValueChange={(value) => {
                          if (nearestTime.index !== -1) {
                            const updatedData = [...data];
                            updatedData[index].times[nearestTime.index].taken = value;
                            setData(updatedData);
                          }
                        }}
                      />
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>Already taken</Text>
        <View>
          {data.map((medication, index) => {
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
                        backgroundColor: "rgba(97,224,132, 0.7)",
                        padding: 10,
                        borderRadius: 8,
                        marginTop: 5
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{medication.name}</Text>
                        <Text>{medication.dosage}</Text>
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
      </ScrollView>
    </View>
  );


}
