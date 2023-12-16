import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import { Header } from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import user from "../../api/user.service";
import { getAppointmentsThunk } from "../../store/slices/info-slice";
import { useAppDispatch } from "../../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

export const MakeAppointment = (props: any) => {
    const {userId} = props.route.params;
    const [phoneNumber, setPhoneNumber] = useState('');
    const [cabinetNumber, setCabinetNumber] = useState('');
    const [title, setTitle] = useState('');
    const [identity, setIdentity] = useState<any>();
    const [date, setDate] = useState('');
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');
    const [isFromTimePickerVisible, setIsFromTimePickerVisible] = useState(false);
    const [isToTimePickerVisible, setIsToTimePickerVisible] = useState(false);

    // Dispatch function from Redux
    const dispatch = useAppDispatch();

    // Function to confirm the selected 'From' time
    const handleFromTimeConfirm = (selectedDate: any) => {
        // Format selected time and update state
        const formattedTime = selectedDate.toLocaleTimeString('en-US', { hour12: false });
        setFromTime(formattedTime);
        hideFromTimePicker();
    };

    // Fetch user identity from tokens in AsyncStorage
    const load = async () => {
        const tokens = await AsyncStorage.getItem("tokens");
        if (tokens != null) {
            const parsedTokens = JSON.parse(tokens);
            const identity: { doctor: boolean, user_id: string } = parsedTokens && jwt_decode(parsedTokens.access);
            setIdentity(identity);
        }
    }

    useEffect(() => {
        load()
    }, []);

    const handleToTimeConfirm = (selectedDate: any) => {
        const formattedTime = selectedDate.toLocaleTimeString('en-US', { hour12: false }); // Get hh:mm:ss format
        setToTime(formattedTime);
        hideToTimePicker();
    };

    const showFromTimePicker = () => {
        setIsFromTimePickerVisible(true);
    };

    const hideFromTimePicker = () => {
        setIsFromTimePickerVisible(false);
    };

    const showToTimePicker = () => {
        setIsToTimePickerVisible(true);
    };

    const hideToTimePicker = () => {
        setIsToTimePickerVisible(false);
    };

    // Function to clear input fields
    const clearInputs = () => {
        setPhoneNumber('');
        setCabinetNumber('');
        setTitle('');
        setDate('');
        setFromTime('');
        setToTime('');
    };
    const handleContinue = () => {
        // Create appointment with provided details
        // Update Redux store with appointments
        // Clear input fields after appointment creation
        user.createAppointment(userId, {
            title,
            date,
            timeTo: toTime,
            timeFrom: fromTime,
            cabinet: cabinetNumber
        }).then(r => {
            dispatch(getAppointmentsThunk(identity.user_id));
            props.navigation.goBack()
        })

        clearInputs();
    };

    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const handleDateConfirm = (selectedDate: any) => {
        const formattedDate = selectedDate.toISOString().split('T')[0]; // Get YYYY-MM-DD format
        setDate(formattedDate);
        hideDatePicker();
    };


    const showDatePicker = () => {
        setIsDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    };

    {/* Doctor's contacts section */}
    {/* Inputs for phone number and cabinet number */}
    {/* Appointment details section */}
    {/* Inputs for title, date, 'From' and 'To' times */}
    {/* Date and time pickers */}
    {/* Continue button */}

    return (
      <ScrollView style={styles.mainContainer}>
          <Header title='Appointment'/>
          <Text style={styles.header}>Doctor's contacts</Text>
          <View style={styles.regularText}>
              <Text>Phone number</Text>
              <TextInput
                style={styles.input}
                keyboardType={"phone-pad"}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              <Text>Cabinet number</Text>
              <TextInput
                keyboardType={"numeric"}
                style={styles.input}
                value={cabinetNumber}
                onChangeText={setCabinetNumber}
              />
          </View>
          <Text style={styles.header}>Appointment details</Text>
          <View style={styles.regularText}>
              <Text>Title</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
              />
              <Text>Date</Text>
              <TouchableOpacity onPress={showDatePicker}>
                  <TextInput
                    style={styles.input}
                    value={date}
                    editable={false}
                  />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />
              <View style={styles.fromToContainer}>
                  <TouchableOpacity onPress={showFromTimePicker}>
                      <Text>From:</Text>
                      <TextInput
                        style={styles.input}
                        value={fromTime}
                        editable={false}
                      />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={showToTimePicker}>
                      <Text>To:</Text>
                      <TextInput
                        style={styles.input}
                        value={toTime}
                        editable={false}
                      />
                  </TouchableOpacity>
              </View>
              <DateTimePickerModal
                isVisible={isFromTimePickerVisible}
                mode="time"
                onConfirm={handleFromTimeConfirm}
                onCancel={hideFromTimePicker}
              />
              <DateTimePickerModal
                isVisible={isToTimePickerVisible}
                mode="time"
                onConfirm={handleToTimeConfirm}
                onCancel={hideToTimePicker}
              />
              <CustomButton onPress={handleContinue}>Continue</CustomButton>
          </View>
      </ScrollView>
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
    },

    input: {
        width: '90%',
        minWidth: '45%',
        height: 40,
        borderColor: 'gray',
        color: "#000",
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
    },

    fromToContainer: {
        flexDirection: "row",
        width: '90%',
        justifyContent: 'space-between',
    },


})
