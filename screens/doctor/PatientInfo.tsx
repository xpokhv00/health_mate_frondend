import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";

// Define a type for the route parameters
interface RouteParams {
    userId: string;
}

export function PatientInfo(props: any) {
    const {navigation} = props;
    // Use the useParams hook to access the route parameter
    const userId = 0;
  // const { userId } = props.route.params;
    const [data, setData] = useState<any>({
        name: 'Max Mustermann',
        age: 27,
        gender: 'male',
        height: 250,
        weight: 400,
        diagnoses: ['Hayfever', 'broken leg'],
    });

    useEffect(() => {
        let user_info: any = AsyncStorage.getItem('user_info');
        if (user_info) {
          const user_info = {}
            // setData(JSON.parse(user_info).profile);
        }

        if (data.allergies) {
            const allergiesString = data.allergies;
            // Remove square brackets and single quotes
            const cleanedString = allergiesString.replace(/[\[\]']/g, '');

            // Split the string by commas to create an array
            const allergiesArray: string[] = cleanedString.split(',').map((item: any) => item.trim());
            data.allergies = allergiesArray;
        }

        if (data.preconditions) {
            const preconditionsString = data.preconditions;
            // Remove square brackets and single quotes
            const cleanedString2 = preconditionsString.replace(/[\[\]']/g, '');

            // Split the string by commas to create an array
            const preconditionsArray: string[] = cleanedString2.split(',').map((item: any) => item.trim());
            data.preconditions = preconditionsArray;
        }
    }, []);

    return (
      <View style={{ alignItems: "center", justifyContent: "center"}}>
          <Text>Patient info</Text>
          <Text>User ID: {userId}</Text>
          <Text>Name: {data.name}</Text>
          <Text>Age: {data.age}</Text>
          <Text>Gender: {data.gender}</Text>
          <Text>Height: {data.height}cm</Text>
          <Text>Weight: {data.weight}kg</Text>
          <Text>Allergies:</Text>
          <FlatList
            data={data.allergies}
            renderItem={({ item }) => <Text>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
          />
          <Text>Preconditions:</Text>
          <FlatList
            data={data.preconditions}
            renderItem={({ item }) => <Text>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
          />
          <Button
            onPress={() => {
                navigation.navigate('PrescribeMedicine', { userId });
            }}
          >Prescribe Medicine</Button>
      </View>
    );
}

