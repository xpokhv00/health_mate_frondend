import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import user from '../../api/user.service';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RNCamera } from "react-native-camera";

export function DoctorQRcode({ navigation }: any) {
  const [result, setResult] = useState('');
  const [showCamera, setShowCamera] = useState(true);

  useEffect(() => {
    console.log('send a request and navigate to the page');
    console.log(result);
  }, [result]);

  useEffect(() => {
    console.log(result);
    user.getInfoByUserId(result)
      .then( async (response: any) => {
        console.log(response);
        await AsyncStorage.setItem('user_info', JSON.stringify(response));
      })
      .catch((error: any) => {
        console.log(error);
      });

    if (result.length > 0) {
      navigation.navigate('PatientInfo', { userId: result });
    }
  }, [result]);

  function onSuccess(e: any) {
    console.log(e.data);
    setResult(e.data)
  }

  return (
    <View style={{ flex: 1 }}>
      {showCamera && (
        <QRCodeScanner
          onRead={onSuccess}
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

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: '61E084'
  },
  buttonTouchable: {
    padding: 16
  }
});
