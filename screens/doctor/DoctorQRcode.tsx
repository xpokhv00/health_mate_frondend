import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import user from '../../api/user.service';

export function DoctorQRcode({ navigation }: any) {
  const [showCamera, setShowCamera] = useState(true);

  // Function called on successful QR code scan
  function onSuccess(e: any) {
    // Retrieve patient information using the scanned QR code data
    user.getInfoByUserId(e.data)
      .then( async (response: any) => {
        // Navigate to PatientInfo screen passing patient information
        navigation.navigate('PatientInfo', { patient_info: {id: e.data, ...response} });
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Display QR code scanner */}
      {showCamera && (
        <QRCodeScanner
          onRead={onSuccess} // Call onSuccess function when QR code is scanned successfully
          topContent={
            <Text style={styles.centerText}>
              Scan your patient QRCode to get their health state.
            </Text>
          }
        />
      )}
    </View>
  );
}

// Styles for the QR code scanner screen
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
});
